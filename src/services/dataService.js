// Data service for loading JSON files

class DataService {
  constructor() {
    this.events = [];
    this.users = [];
    this.registrations = [];
    this.loaded = false;
  }

  async loadData() {
    if (this.loaded) return;

    try {
      const [eventsRes, usersRes, registrationsRes] = await Promise.all([
        fetch("/data/events.json"),
        fetch("/data/users.json"),
        fetch("/data/registrations.json"),
      ]);

      this.events = await eventsRes.json();
      this.users = await usersRes.json();
      this.registrations = await registrationsRes.json();

      // Normalize MongoDB export format
      this.normalizeData();

      this.loaded = true;

      // Calculate registration counts
      this.calculateRegistrationCounts();
    } catch (error) {
      console.error("Error loading data:", error);
      throw error;
    }
  }

  normalizeData() {
    // Convert MongoDB export format to simple format
    this.registrations = this.registrations.map((reg) => ({
      _id: reg._id?.$oid || reg._id,
      userId: reg.userId?.$oid || reg.userId,
      eventId: reg.eventId?.$oid || reg.eventId,
      type: reg.type,
      userIds:
        reg.userIds?.map((id) => id.$oid || id) ||
        reg.members?.map((id) => id.$oid || id),
      groupName: reg.groupName,
      registrationDate: reg.registrationDate?.$date || reg.registrationDate,
    }));

    this.users = this.users.map((user) => ({
      _id: user._id?.$oid || user._id,
      name: user.username || user.name,
      username: user.username,
      email: user.email,
      phone: user.mobno || user.phone,
    }));
  }

  calculateRegistrationCounts() {
    // Reset counts
    this.events.forEach((event) => {
      event.registrationCount = 0;
      event.totalParticipants = 0;
    });

    // Count registrations per event
    this.registrations.forEach((reg) => {
      const event = this.events.find((e) => e.id === reg.eventId);
      if (event) {
        event.registrationCount++;

        if (reg.type === "group" && reg.userIds) {
          event.totalParticipants += reg.userIds.length;
        } else {
          event.totalParticipants++;
        }
      }
    });
  }

  async getEvents() {
    await this.loadData();
    return this.events;
  }

  async getStats() {
    await this.loadData();

    const totalEvents = this.events.length;
    const totalRegistrations = this.registrations.length;
    const individualRegistrations = this.registrations.filter(
      (r) => r.type === "individual"
    ).length;
    const groupRegistrations = this.registrations.filter(
      (r) => r.type === "group"
    ).length;

    return {
      totalEvents,
      totalRegistrations,
      individualRegistrations,
      groupRegistrations,
    };
  }

  async getEventRegistrations(eventId) {
    await this.loadData();

    const eventRegistrations = this.registrations.filter(
      (r) => r.eventId === eventId
    );

    return eventRegistrations.map((reg) => {
      let userDetails = [];

      if (reg.type === "group" && reg.userIds) {
        userDetails = reg.userIds.map(
          (userId) =>
            this.users.find((u) => u._id === userId) || {
              _id: userId,
              name: "Unknown User",
            }
        );
      } else if (reg.userId) {
        const user = this.users.find((u) => u._id === reg.userId);
        userDetails = user
          ? [user]
          : [{ _id: reg.userId, name: "Unknown User" }];
      }

      return {
        ...reg,
        userDetails,
      };
    });
  }
}

export default new DataService();
