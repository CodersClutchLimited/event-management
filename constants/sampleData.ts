export const EventData = [
  {
    _id: "65a2f8d9c72e4c8b3a1b1001",
    title: "AI & Future Tech Summit 2025",
    description:
      "A summit discussing AI advancements, ethics, and future applications.",
    location: "San Francisco Tech Center",
    schedule: {
      start: "2025-07-10T09:00:00.000Z",
      end: "2025-07-11T17:00:00.000Z",
    },
    registrationDeadline: "2025-07-05T23:59:59.000Z",
    createdBy: {
      _id: "65a3e567c72e4c8b3a2b2001",
      name: "John Doe",
      email: "johndoe@example.com",
      role: "Admin",
    },
    maxParticipants: 200,
    registeredUsers: [
      {
        _id: "65a4e678c72e4c8e3a2b3001",
        name: "Alice Johnson",
        email: "alicej@example.com",
        registeredAt: "2025-06-20T14:30:00.000Z",
        checkInStatus: false,
        role: "participant",
      },
      {
        _id: "65a4e789c72e4c8b3a2b3002",
        name: "Bob Smith",
        email: "bobsmith@example.com",
        registeredAt: "2025-06-22T10:15:00.000Z",
        checkInStatus: false,
        role: "VIP",
      },
    ],
    waitlist: [
      {
        _id: "65a4e890c72e4c8b3a2b3003",
        name: "Charlie Brown",
        email: "charlieb@example.com",
        joinedAt: "2025-06-25T18:45:00.000Z",
      },
    ],
    status: "upcoming",
    isPublished: true,
    canceledReason: null,
    notifications: {
      sendReminders: true,
      reminderTimes: ["2025-07-08T09:00:00.000Z", "2025-07-09T12:00:00.000Z"],
    },
    createdAt: "2025-06-01T08:00:00.000Z",
  },
  {
    _id: "65a2f8d9c72e4c8b3a2b1001",
    title: "AI & Future Tech Summit 2025",
    description:
      "A summit discussing AI advancements, ethics, and future applications.",
    location: "San Francisco Tech Center",
    schedule: {
      start: "2025-07-10T09:00:00.000Z",
      end: "2025-07-11T17:00:00.000Z",
    },
    registrationDeadline: "2025-07-05T23:59:59.000Z",
    createdBy: {
      _id: "65a3e567c72e4c8b3a2b2001",
      name: "John Doe",
      email: "johndoe@example.com",
      role: "Admin",
    },
    maxParticipants: 200,
    registeredUsers: [
      {
        _id: "65a4e678c72e4c8b3a2b3001",
        name: "Alice Johnson",
        email: "alicej@example.com",
        registeredAt: "2025-06-20T14:30:00.000Z",
        checkInStatus: false,
        role: "participant",
      },
      {
        _id: "65a4e789c72e4c8b3a2b3002",
        name: "Bob Smith",
        email: "bobsmith@example.com",
        registeredAt: "2025-06-22T10:15:00.000Z",
        checkInStatus: false,
        role: "VIP",
      },
    ],
    waitlist: [
      {
        _id: "65a4e890c72e4c8b3a2b3003",
        name: "Charlie Brown",
        email: "charlieb@example.com",
        joinedAt: "2025-06-25T18:45:00.000Z",
      },
    ],
    status: "ongoing",
    isPublished: true,
    canceledReason: null,
    notifications: {
      sendReminders: true,
      reminderTimes: ["2025-07-08T09:00:00.000Z", "2025-07-09T12:00:00.000Z"],
    },
    createdAt: "2025-06-01T08:00:00.000Z",
  },
  {
    _id: "65a2f8d9c72e4c8b3a2b1002",
    title: "Cybersecurity Conference 2025",
    description: "A deep dive into modern cybersecurity threats and solutions.",
    location: "New York Convention Center",
    schedule: {
      start: "2025-08-15T10:00:00.000Z",
      end: "2025-08-16T18:00:00.000Z",
    },
    registrationDeadline: "2025-08-10T23:59:59.000Z",
    createdBy: {
      _id: "65a3e567c72e4c8b3a2b2002",
      name: "Emily Watson",
      email: "emilyw@example.com",
      role: "Admin",
    },
    maxParticipants: 150,
    registeredUsers: [
      {
        _id: "65a4e678c72e4c8b3a2b3004",
        name: "David Lee",
        email: "davidl@example.com",
        registeredAt: "2025-07-10T12:00:00.000Z",
        checkInStatus: false,
        role: "participant",
      },
    ],
    waitlist: [],
    status: "upcoming",
    isPublished: true,
    canceledReason: null,
    notifications: {
      sendReminders: true,
      reminderTimes: ["2025-08-14T09:00:00.000Z"],
    },
    createdAt: "2025-07-05T08:00:00.000Z",
  },
  {
    _id: "65a2f8d9c72e4c8b3a2b1003",
    title: "Blockchain Summit",
    description:
      "Discussing the future of decentralized finance and blockchain tech.",
    location: "Los Angeles Crypto Hub",
    schedule: {
      start: "2025-09-20T09:00:00.000Z",
      end: "2025-09-21T17:00:00.000Z",
    },
    registrationDeadline: "2025-09-15T23:59:59.000Z",
    createdBy: {
      _id: "65a3e567c72e4c8b3a2b2003",
      name: "Michael Jordan",
      email: "mjordan@example.com",
      role: "Admin",
    },
    maxParticipants: 100,
    registeredUsers: [],
    waitlist: [],
    status: "completed",
    isPublished: false,
    canceledReason: null,
    notifications: {
      sendReminders: false,
      reminderTimes: [],
    },
    createdAt: "2025-08-01T08:00:00.000Z",
  },
  {
    _id: "65a2f8d9c72e4c8b4a2b1002",
    title: "Cybersecurity Conference 2025",
    description: "A deep dive into modern cybersecurity threats and solutions.",
    location: "New York Convention Center",
    schedule: {
      start: "2025-08-15T10:00:00.000Z",
      end: "2025-08-16T18:00:00.000Z",
    },
    registrationDeadline: "2025-08-10T23:59:59.000Z",
    createdBy: {
      _id: "65a3e567c72e4c8b3a2b2002",
      name: "Emily Watson",
      email: "emilyw@example.com",
      role: "Admin",
    },
    maxParticipants: 150,
    registeredUsers: [
      {
        _id: "65a4e678c72e4c8b3a2b3004",
        name: "David Lee",
        email: "davidl@example.com",
        registeredAt: "2025-07-10T12:00:00.000Z",
        checkInStatus: false,
        role: "participant",
      },
    ],
    waitlist: [],
    status: "canceled",
    isPublished: true,
    canceledReason: null,
    notifications: {
      sendReminders: true,
      reminderTimes: ["2025-08-14T09:00:00.000Z"],
    },
    createdAt: "2025-07-05T08:00:00.000Z",
  },
  {
    _id: "65a2f8d9c72e4c823a2b1002",
    title: "Cybersecurity Conference 2025",
    description: "A deep dive into modern cybersecurity threats and solutions.",
    location: "New York Convention Center",
    schedule: {
      start: "2025-08-15T10:00:00.000Z",
      end: "2025-08-16T18:00:00.000Z",
    },
    registrationDeadline: "2025-08-10T23:59:59.000Z",
    createdBy: {
      _id: "65a3e567c72e4c8b3a2b2002",
      name: "Emily Watson",
      email: "emilyw@example.com",
      role: "Admin",
    },
    maxParticipants: 150,
    registeredUsers: [
      {
        _id: "65a4e678c72e4c8b3a2b3004",
        name: "David Lee",
        email: "davidl@example.com",
        registeredAt: "2025-07-10T12:00:00.000Z",
        checkInStatus: false,
        role: "participant",
      },
    ],
    waitlist: [],
    status: "upcoming",
    isPublished: true,
    canceledReason: null,
    notifications: {
      sendReminders: true,
      reminderTimes: ["2025-08-14T09:00:00.000Z"],
    },
    createdAt: "2025-07-05T08:00:00.000Z",
  },
];


export const userData = [
  {
    id: "61a2b13f5b3b8f54b1f8df3c",
    firstName: "John",
    initial: "D",
    lastName: "Doe",
    email: "johndoe@example.com",
    password: "hashed_password123",
    telNum: "+1234567890",
    profilePicture: "https://example.com/profile-pictures/johndoe.jpg",
    address: {
      street: "123 Elm Street",
      city: "Springfield",
      country: "USA",
    },
    role: "user",
    status: "active",
    authMethod: {
      isEmailVerified: true,
      isPhoneVerified: false,
      is2faVerified: false,
    },
    registeredEvents: [
      { id: "evt123", registeredAt: "2025-01-15T10:30:00Z" },
      { id: "evt456", registeredAt: "2025-01-16T14:45:00Z" },
    ],
    waitListEvents: [
      { id: "evt789", joinedAt: "2025-01-17T09:15:00Z" },
    ],
    lastLogin: "2025-01-17T12:00:00Z",
    registeredAt: "2025-01-01T09:00:00Z",
  },
  {
    id: "61a2b13f5b3b8f54b1f8df3d",
    firstName: "Jane",
    initial: "S",
    lastName: "Smith",
    email: "janesmith@example.com",
    password: "hashed_password456",
    telNum: "+9876543210",
    profilePicture: "https://example.com/profile-pictures/janesmith.jpg",
    address: {
      street: "456 Maple Avenue",
      city: "Metropolis",
      country: "Canada",
    },
    role: "subAdmin",
    status: "suspended",
    authMethod: {
      isEmailVerified: true,
      isPhoneVerified: true,
      is2faVerified: true,
    },
    registeredEvents: [
      { id: "evt789", registeredAt: "2025-01-12T08:00:00Z" },
    ],
    waitListEvents: [
      { id: "evt456", joinedAt: "2025-01-16T11:30:00Z" },
    ],
    lastLogin: "2025-01-16T15:00:00Z",
    registeredAt: "2025-01-05T10:00:00Z",
  },
  {
    id: "61a2b13f5b3b8f54b1f8df3e",
    firstName: "Alice",
    initial: "B",
    lastName: "Brown",
    email: "alicebrown@example.com",
    password: "hashed_password789",
    telNum: "+5647382910",
    profilePicture: "https://example.com/profile-pictures/alicebrown.jpg",
    address: {
      street: "789 Oak Boulevard",
      city: "Gotham",
      country: "UK",
    },
    role: "admin",
    status: "blocked",
    authMethod: {
      isEmailVerified: false,
      isPhoneVerified: false,
      is2faVerified: true,
    },
    registeredEvents: [],
    waitListEvents: [],
    lastLogin: "2025-01-10T08:00:00Z",
    registeredAt: "2025-01-03T14:00:00Z",
  },
  {
    id: "61a2b13f5b3b8f54b1f8df3f",
    firstName: "Bob",
    initial: "W",
    lastName: "White",
    email: "bobwhite@example.com",
    password: "hashed_password987",
    telNum: "+1222333444",
    profilePicture: "https://example.com/profile-pictures/bobwhite.jpg",
    address: {
      street: "321 Pine Road",
      city: "Greenwich",
      country: "Australia",
    },
    role: "user",
    status: "active",
    authMethod: {
      isEmailVerified: true,
      isPhoneVerified: true,
      is2faVerified: false,
    },
    registeredEvents: [
      { id: "evt321", registeredAt: "2025-01-14T10:00:00Z" },
    ],
    waitListEvents: [],
    lastLogin: "2025-01-17T12:45:00Z",
    registeredAt: "2025-01-02T08:30:00Z",
  },
  {
    id: "61a2b13f5b3b8f54b1f8df40",
    firstName: "Eve",
    initial: "B",
    lastName: "Black",
    email: "eveblack@example.com",
    password: "hashed_password654",
    telNum: "+1111222333",
    profilePicture: "https://example.com/profile-pictures/eveblack.jpg",
    address: {
      street: "654 Cedar Lane",
      city: "Shelbyville",
      country: "USA",
    },
    role: "subAdmin",
    status: "active",
    authMethod: {
      isEmailVerified: false,
      isPhoneVerified: true,
      is2faVerified: true,
    },
    registeredEvents: [
      { id: "evt654", registeredAt: "2025-01-18T09:00:00Z" },
    ],
    waitListEvents: [],
    lastLogin: "2025-01-18T08:30:00Z",
    registeredAt: "2025-01-04T16:45:00Z",
  },
  {
    id: "61a2b13f5b3b8f54b1f8df41",
    firstName: "Chris",
    initial: "G",
    lastName: "Green",
    email: "chrisgreen@example.com",
    password: "hashed_password234",
    telNum: "+4455667788",
    profilePicture: "https://example.com/profile-pictures/chrisgreen.jpg",
    address: {
      street: "987 Birch Street",
      city: "Springfield",
      country: "USA",
    },
    role: "admin",
    status: "active",
    authMethod: {
      isEmailVerified: true,
      isPhoneVerified: true,
      is2faVerified: true,
    },
    registeredEvents: [
      { id: "evt987", registeredAt: "2025-01-11T14:00:00Z" },
    ],
    waitListEvents: [],
    lastLogin: "2025-01-17T16:30:00Z",
    registeredAt: "2025-01-06T12:00:00Z",
  },
];



