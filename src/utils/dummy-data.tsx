import { addDays, addHours, setHours } from "date-fns";

const department1 = {
  id: "department-id-1",
  name: "Games Dept.",
  facility: {
    id: "facility-id-1",
  },
};

const facility1 = {
  id: "facility-id-1",
  name: "Fun & Games Inc.",
  active_users: 23,
  address: {
    city: "Würzburg",
    zip: "97070",
    number: "23",
    street: "Beethovenstraße",
  },
};

export const dummyUser = {
  getUser: {
    id: "user-id-1",
    roles: ["EMPLOYER", "WORKER"],
    calendar: "qwer5432",
    facilities: [
      {
        id: "facility-id-1",
        name: "Fun & Games Inc.",
        active_users: 23,
        address: {
          city: "Würzburg",
          zip: "97070",
          number: "23",
          street: "Beethovenstraße",
        },
        departments: [
          {
            id: department1.id,
            name: department1.name,
            facility: {
              id: department1.facility.id,
            },
          },
        ],
        users: [
          {
            role: "ADMIN",
            user: {
              id: "user-id-1",
              first_name: "Mina",
              last_name: "Muster",
              email: "mina.muster@funngames.de",
            },
          },
          {
            role: "WORKER",
            user: {
              id: "user-id-2",
              first_name: "Kevin",
              last_name: "Brinkhaus",
              email: "kbrinkhaus34@fmail.com",
            },
          },
        ],
        pools: [
          {
            id: "pool-id-1",
            title: "Frühschicht",
          },
        ],
        billing: {
          stripe_customer_id: "sdg-sdg-hm-3460938",
          current_subscription: {
            id: "lskdnvl456",
            stripe_id: "akejrgma3456345vse",
            start: 1660082400000,
            end: 1662674400000,
            status: "ACTIVE",
            plan: {
              id: "subscription-plan-id-1",
              title: "JiM Medium",
              description: "Für größere Eingriffe.",
              stripe_id: "skjgn456jneglkn456",
              status: "ACTIVE",
              monthly_active_users: 50,
              limits: [
                {
                  metric: "MONTHLY_ACTIVE_USERS",
                  limit: 50,
                },
              ],
              price: 10000,
            },
          },
        },
      },
    ],
  },
};

export const dummyUser2 = {
  getUser: {
    id: "user-id-1",
    roles: ["EMPLOYER", "WORKER"],
    calendar: "qwer5432",
    facilities: [
      {
        id: "facility-id-1",
        name: "Fun & Games Inc.",
        active_users: 23,
        address: {
          city: "Würzburg",
          zip: "97070",
          number: "23",
          street: "Beethovenstraße",
        },
        departments: [
          {
            id: department1.id,
            name: department1.name,
            facility: {
              id: department1.facility.id,
            },
          },
        ],
        users: [
          {
            role: "ADMIN",
            user: {
              id: "user-id-1",
              first_name: "Mina",
              last_name: "Muster",
              email: "mina.muster@funngames.de",
            },
          },
          {
            role: "WORKER",
            user: {
              id: "user-id-2",
              first_name: "Kevin",
              last_name: "Brinkhaus",
              email: "kbrinkhaus34@fmail.com",
            },
          },
        ],
        pools: [
          {
            id: "pool-id-1",
            title: "Frühschicht",
          },
        ],
        billing: {
          stripe_customer_id: "sdg-sdg-hm-3460938",
          current_subscription: {
            id: "lskdnvl456",
            stripe_id: "akejrgma3456345vse",
            start: 1660082400000,
            end: 1662674400000,
            status: "ACTIVE",
            plan: {
              id: "subscription-plan-id-1",
              title: "JiM Medium",
              description: "Für größere Eingriffe.",
              stripe_id: "skjgn456jneglkn456",
              status: "ACTIVE",
              monthly_active_users: 50,
              limits: [
                {
                  metric: "MONTHLY_ACTIVE_USERS",
                  limit: 50,
                },
              ],
              price: 10000,
            },
          },
        },
      },
    ],
  },
};

export const dummyUserInfo = {
  getUser: {
    availabilities: [
      {
        id: "availibility-id-1",
        start_time: addDays(new Date(), 2).getTime(),
        end_time: addHours(addDays(new Date(), 2), 4).getTime(),
      },
      {
        id: "availibility-id-2",
        start_time: addDays(new Date(), 4).getTime(),
        end_time: addHours(addDays(new Date(), 4), 5).getTime(),
      },
      {
        id: "availibility-id-3",
        start_time: addDays(new Date(), 5).getTime(),
        end_time: addHours(addDays(new Date(), 5), 4).getTime(),
      },
    ],
    accepted_jobs: [
      {
        id: "job-instance-id-1",
        start_time: addDays(new Date(), 1).getTime(),
        end_time: addHours(addDays(new Date(), 1), 3).getTime(),
      },
      {
        id: "job-instance-id-2",
        start_time: addDays(new Date(), 3).getTime(),
        end_time: addHours(addDays(new Date(), 3), 4).getTime(),
      },
      {
        id: "job-instance-id-3",
        start_time: addDays(new Date(), 6).getTime(),
        end_time: addHours(addDays(new Date(), 6), 2).getTime(),
      },
    ],
    pools: [
      {
        id: "pool-id-1",
        title: "Frühschicht",
      },
    ],
  },
};

export const dummyOpenJobInstances = {
  listJobInstances: [
    {
      id: "jobInstance-id-4",
      job: {
        id: "job-id-1",
        title: "Games veranstalten",
      },
      status: "OPEN",
      department: {
        id: department1.id,
        name: department1.name,
        facility: {
          name: facility1.name,
        },
      },
      start_time: setHours(addDays(new Date(), 7), 7).getTime(),
      end_time: setHours(addDays(new Date(), 7), 14).getTime(),
      length: 7,
      pay: 70,
      description: "Du veranstaltest Games (muss auch mit Fun dabei sein).",
      worker: null,
      instant_book: false,
      group_id: "job-instance-group-id-1",
    },
    {
      id: "jobInstance-id-5",
      job: {
        id: "job-id-2",
        title: "Fun veranstalten",
      },
      status: "OPEN",
      department: {
        id: department1.id,
        name: department1.name,
        facility: {
          name: facility1.name,
        },
      },
      start_time: setHours(addDays(new Date(), 9), 8).getTime(),
      end_time: setHours(addDays(new Date(), 9), 12).getTime(),
      length: 4,
      pay: 44,
      description: "Du veranstaltest Fun (OHNE Games).",
      worker: null,
      instant_book: true,
      group_id: "job-instance-group-id-2",
    },
    {
      id: "jobInstance-id-6",
      job: {
        id: "job-id-2",
        title: "Fun veranstalten",
      },
      status: "OPEN",
      department: {
        id: department1.id,
        name: department1.name,
        facility: {
          name: facility1.name,
        },
      },
      start_time: addDays(new Date(), 3).getTime(),
      end_time: addHours(addDays(new Date(), 3), 4).getTime(),
      length: 4,
      pay: 46,
      description: "Du veranstaltest Fun (OHNE Games).",
      worker: null,
      instant_book: false,
      group_id: "job-instance-group-id-4",
    },
    {
      id: "jobInstance-id-7",
      job: {
        id: "job-id-1",
        title: "Games veranstalten",
      },
      status: "OPEN",
      department: {
        id: department1.id,
        name: department1.name,
        facility: {
          name: facility1.name,
        },
      },
      start_time: setHours(addDays(new Date(), 7), 7).getTime(),
      end_time: setHours(addDays(new Date(), 7), 14).getTime(),
      length: 7,
      pay: 70,
      description: "Du veranstaltest Games (muss auch mit Fun dabei sein).",
      worker: null,
      instant_book: false,
      group_id: "job-instance-group-id-1",
    },
    {
      id: "jobInstance-id-8",
      job: {
        id: "job-id-1",
        title: "Games veranstalten",
      },
      status: "OPEN",
      department: {
        id: department1.id,
        name: department1.name,
        facility: {
          name: facility1.name,
        },
      },
      start_time: setHours(addDays(new Date(), 7), 7).getTime(),
      end_time: setHours(addDays(new Date(), 7), 14).getTime(),
      length: 7,
      pay: 70,
      description: "Du veranstaltest Games (muss auch mit Fun dabei sein).",
      worker: null,
      instant_book: false,
      group_id: "job-instance-group-id-1",
    },
  ],
};

export const dummyPools = {
  getPool: {
    id: "pool-id-1",
    title: "Frühschicht",
    description: "Morgens hin, Fun & Games veranstalten, abends weg.",
    workers: [
      {
        id: "user-id-2",
        first_name: "Kevin",
        last_name: "Brinkhaus",
      },
    ],
  },
};
