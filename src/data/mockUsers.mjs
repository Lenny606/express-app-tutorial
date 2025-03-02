export const mockUsers = [
    {
        id: 1,
        username: "john_doe",
        email: "john.doe@example.com",
        firstName: "John",
        lastName: "Doe",
        age: 28,
        createdAt: new Date("2024-01-15").toISOString(),
        role: "user"
    },
    {
        id: 2,
        username: "jane_smith",
        email: "jane.smith@example.com",
        firstName: "Jane",
        lastName: "Smith",
        age: 32,
        createdAt: new Date("2024-02-01").toISOString(),
        role: "admin"
    },
    {
        id: 3,
        username: "bob_wilson",
        email: "bob.wilson@example.com",
        firstName: "Bob",
        lastName: "Wilson",
        age: 25,
        createdAt: new Date("2024-03-10").toISOString(),
        role: "user"
    }
];

// Helper function to find user by ID
export const findUserById = (id) => {
    return mockUsers.find(user => user.id === id);
};

// Helper function to find user by username
export const findUserByUsername = (username) => {
    return mockUsers.find(user => user.username === username);
};

// Helper function to find user by email
export const findUserByEmail = (email) => {
    return mockUsers.find(user => user.email === email);
}; 