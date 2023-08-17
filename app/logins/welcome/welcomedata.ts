export type Data = {
  id: number;
  background: any;
  image: any;
};

export const data: Data[] = [
  {
    id: 1,
    image: require("@assets/images/welcomeImages/image1temp.png"),
    background: require("@assets/images/welcomeImages/screen1temp.png"),
  },
  {
    id: 2,
    image: require("@assets/images/welcomeImages/image2temp.png"),
    background: require("@assets/images/welcomeImages/screen2temp.png"),
  },
  {
    id: 3,
    image: require("@assets/images/welcomeImages/image3temp.png"),
    background: require("@assets/images/welcomeImages/screen3temp.png"),
  },
  {
    id: 4,
    image: require("@assets/images/welcomeImages/image4temp.png"),
    background: require("@assets/images/welcomeImages/screen4temp.png"),
  },
];
