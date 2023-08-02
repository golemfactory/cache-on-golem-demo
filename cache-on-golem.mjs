import Redis from "ioredis";

export function connectCache() {
  const cache = new Redis({
    host: "grisha-reboot-test.portal.golem.network",
    port: 6380,
    password: "5862800daa0ca8935a8be026ce206661",
    tls: { servername: "grisha-reboot-test.portal.golem.network" },
  });
  // const cache = new Redis({
  //   host: "powerful-clever-airplane.portal.golem.network",
  //   port: 6380,
  //   password: "3693dd5da30f15642b117c89758d318e",
  //   tls: { servername: "powerful-clever-airplane.portal.golem.network" },
  // });

  return {
    set: (key, value) => {
      return cache.set(key, value);
    },
    get: (key) => {
      return cache.get(key);
    },
    disconnect: async () => {
      await cache.quit();
      await cache.disconnect(false);
    },
    withCache: (fnComputeValue) => {
      return async (...args) => {
        const key = `cached_on_golem_${args.join("_")}`;

        const cached = await cache.get(key);
        if (cached !== null) {
          return cached;
        } else {
          const value = await fnComputeValue(...args);
          await cache.set(key, value);
          return value;
        }
      };
    },
  };
}
