import { join } from 'path';
import bands from './bandsDiff.json';


type MusicBand = {
  name: string;
  genre: string;
  members: BandMember[];
  originCountry: string;
  foundedYear: number;
  isStillActive: boolean;
  albums: Album[];
};

type BandMember = {
  name: string;
  instrument: string;
  birthYear: number;
  joinedYear: number;
  leftYear?: number; 
};

type Album = {
  title: string;
  releaseYear: number;
  tracks: Track[];
};

type Track = {
  title: string;
  durationInSeconds: number;
};

//1

const trackCount = bands.reduce((total, band) => total + (band.trackCount || 0), 0);
console.log('Загальна кількість треків усіх гуртів:', trackCount);

//2

const allMembers = bands.flatMap(band => band.members);
console.log(allMembers);

//3


const albumCount = bands.reduce((total, band) => total + (band.albums?.length || 0), 0);
console.log("Загальна кількість альбомів:", albumCount)


//5
const allMemberS = bands.flatMap(band => band.members);
const birthYearAfter1960 = allMemberS.filter(member => member && member.birthYear && member.birthYear > 1960);
console.log("Учасники, що народилися після 1960 року:", birthYearAfter1960);

//6

const activeBands = bands.filter(band => band.isStillActive === true);
console.log("Активні гурти:", activeBands);

//7

let bandWithFewestTracks = bands[0];

for (let i = 1; i < bands.length; i++) {
  if (bands[i].trackCount < bandWithFewestTracks.trackCount) {
    bandWithFewestTracks = bands[i];
  }
}

console.log("Гурт з найменшою кількістю треків:");
console.log(`Ім'я: ${bandWithFewestTracks.name}`);
console.log(`Кількість треків: ${bandWithFewestTracks.trackCount}`);


//10

const longTracks = bands
  .flatMap(band => band.albums || [])
  .flatMap(album => album.tracks || [])
  .filter(track => track && track.durationInSeconds > 300);

console.log('Пісні тривалістю більше 300 секунд:', longTracks);

//11

const longTrackTitles = bands
  .flatMap(band => band.albums ?? [])
  .flatMap(album => album.tracks ?? [])
  .filter(track => track?.title && track.durationInSeconds! > 180)
  .map(track => track.title as string);

console.log("Назви треків з тривалістю більше 3 хвилин", longTrackTitles);



//12

const tracksAfter1991 = bands
  .flatMap(band => band.albums || [])
  .flatMap(album => album.tracks || [])
  .filter(track => track && track.releaseYear > 1991 && track.title);

console.log('Треки після 1991 року:', tracksAfter1991);

//13

const countries = bands.map(band => band.originCountry);
const uniqueCountries = Array.from(new Set(countries.filter(country => country && country)
));

if (uniqueCountries.length === 0) {
  console.log("Не знайдено унікальні країни походження гуртів");
} else {
  console.log("Знайдено унікальні країни походження гуртів:", uniqueCountries);
}

//14

const albumsInfo = bands.flatMap(band => (band.albums ?? []).map(album => ({
    name: band.name,
    nameAlbom: album.title,
    countOfTrecksInAlbom: (album.tracks ?? []).filter(track => track && track.title).length
  }))
);

console.log("Інформація про альбоми:", albumsInfo);



//16

const activeMusicians = bands.flatMap(band => (band.members ?? [])
    .filter(member => member && member.name && member.leftYear === undefined )
    .map(member => ({
    band: band.name,
    name: member.name,
    instument: member.instrument,
    joinedYear: member.joinedYear
  }))
);
console.log("Музиканти, які ще не залишили гурт:", activeMusicians);

//17

const bandTrackList = bands.flatMap(band => (band.albums ?? [])
  .flatMap(album => (album.tracks ?? [])
  .filter(track => track && track.title)
  .map(track => ({
      band: band.name,
      track: track.title
    }))
  )
);
console.log("Список гуртів і їхніх пісень:", bandTrackList);

//18

const songsWithRoad = bands.flatMap(band => (band.albums ?? [])
  .flatMap(album => (album.tracks ?? [])
  .filter(track => track && track.title && track.title.includes("Road"))
  .map(track => track.title)
  )
);

console.log("Пісні, що містять 'Road':", songsWithRoad);

//19

const bandTrackCounts: { [bandName: string]: number } = {};

for (const band of bands) {
   bandTrackCounts[band.name] = band.trackCount;
}
console.log(bandTrackCounts);

//20

function formatDuration(durationInSeconds: number): string {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes} хвилин ${seconds} секунд`;
}
for (const band of bands) {
  if (!band.albums) continue;

  for (const album of band.albums) {
    if (!album.tracks) continue;

    for (const track of album.tracks) {
      if (track && track.title && track.durationInSeconds != null) {

        console.log(`Пісня: "${track.title}" - Тривалість: ${formatDuration(track.durationInSeconds)}`);
      }
    }
  }
}

//21

const bandsCopy = bands.slice();  
const reversedBands = bandsCopy.reverse();  
const lastRockBand = reversedBands.find(band => band.genre === "Rock");
console.log('Останній гурт у жанрі Rock:', lastRockBand?.name);

