import casual from 'casual';

const mocks = {
    String: () => 'It works!',
    Query: () => ({
      user: (root, args) => {
        return {
          firstName: args.firstName,
          lastName: args.lastName
        }
      }
    }),
    User: () => ({
      firstName: () => casual.first_name,
      lastName: () => casual.last_name,
      email: () => casual.email,
      username: () => casual.username,
      password: () => casual.password,
      roles: () => casual.random_value({ a: 'Team Lead', b: 'Admin', c: 'Employee' }),
      avatar: () => casual.random_value({
        "large": "https://randomuser.me/api/portraits/women/95.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/95.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/95.jpg"
      })
    }),
    Leave: () => ({
      fromDate: () => casual.date(format = 'YYYY-MM-DD'),
      toDate: () => casual.date(format = 'YYYY-MM-DD'),
      reason: () => casual.description,
      type: () => casual.random_value({ a: 'Sick Leave', b: 'Vacation Leave', c: 'Offset' })
    })
};

export default mocks;