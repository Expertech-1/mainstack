// let whitelist: string[] = [
//     "http://127.0.0.1:3000",
//     "http://127.0.0.1:3001",
//     "http://127.0.0.1:3002",
//     "http://127.0.0.1:3003",
//     "http://127.0.0.1:3004",
//     "http://127.0.0.1:3005",
//   ];
  
//   export const getWhitelist = (env: string) => {
//     if (env !== "development") {
//       return [
//         ...whitelist,
//         "https://mainstack-vzwg.onrender.com"
//       ];
//     }
//     return whitelist;
//   };

export const getWhitelist = (env: string) => {
  const whitelist: string[] = [
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:3002",
    "http://127.0.0.1:3003",
    "http://127.0.0.1:3004",
    "http://127.0.0.1:3005",
  ];

  if (env !== "development") {
    return [
      ...whitelist,
      "https://mainstack-vzwg.onrender.com"
    ];
  }
  return whitelist;
};

  