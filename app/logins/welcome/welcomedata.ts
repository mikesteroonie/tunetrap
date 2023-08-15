export type Data = {
  id: number;
  background: any;
  image: any;
};

export const data: Data[] = [
  {
    id: 1,
    image: require("@assets/images/welcomeImages/image1.png"),
    background: require("@assets/images/welcomeImages/screen1.jpg"),
  },
  {
    id: 2,
    image: require("@assets/images/welcomeImages/image2.png"),
    background: require("@assets/images/welcomeImages/screen2.png"),
  },
  {
    id: 3,
    image: require("@assets/images/welcomeImages/image3.png"),
    background: require("@assets/images/welcomeImages/screen3.png"),
  },
  {
    id: 4,
    image: require("@assets/images/welcomeImages/image4.png"),
    background: require("@assets/images/welcomeImages/screen4.png"),
  },
];
