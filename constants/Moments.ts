import type { Moment } from "@/typings/Moment"

const randomPhotos = [
  'https://randompicturegenerator.com/img/cat-generator/g8c05547620a4cada5c84f16d2d937b4943936cb13dc0a477c415ed5a25b5ff4bd89bebaa39e463cd9ea2c2a1dd74a201_640.jpg',
  'https://randompicturegenerator.com/img/cat-generator/g26e58f1c43e31a45012ee73ca9f89c9de79374af892c5cd926ec8d9280305d44490283cfd869172c8f8ea322827287f3_640.jpg',
  'https://randompicturegenerator.com/img/cat-generator/g442aacb7b23e5f83b893bcc0fe86ad125b2426c94ad4ef4f411082593318b19ff9a8f6fae4e524b2dbe7f1b3bb26053b_640.jpg',
  'https://randompicturegenerator.com/img/cat-generator/gffac7d89a6766193920012ecea55e5faf3d8494670322109af3ec828743b7462bd13326ea1d2f24cc64e871021abab1b_640.jpg',
]

export const list: Moment[] = new Array(10).fill(null).map((_, i) => (
  {
    user: {
      name: `用户${i}`,
      id: String(i),
      avatar: randomPhotos[Math.floor(Math.random() * randomPhotos.length)],
    },
    content: i % 3 ? 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' : '',
    photos: new Array(9).fill(null).map((_, i) => ({
      id: `img-${i}`,
      thumbnail: randomPhotos[Math.floor(Math.random() * randomPhotos.length)],
      src: '',
    })).slice(0, 1 /*Math.random() * 10 */),
    time: `2016-05-02T00:00:00`,
  }
))