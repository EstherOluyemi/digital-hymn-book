import { Hymn } from "../models/hymn.model";

export const HYMNS: Hymn[] = [
    {
    id: 1,
    number: 1,
    title: 'Amazing Grace',
    author: 'John Newton',
    category: 'Praise',
    verses: [
      'Amazing grace! How sweet the sound, that saved a wretch like me! I once was lost, but now am found, was blind, but now I see.',
    ],
  },
  {
    id: 2,
    number: 2,
    title: 'Holy, Holy, Holy! Lord God Almighty!',
    author: 'Reginald Heber',
    category: 'Worship',
    verses: [
      'Holy, holy, holy! Lord God Almighty! Early in the morning our song shall rise to thee; holy, holy, holy! Merciful and mighty! God in three Persons, blessed Trinity!',
    ],
  },
  {
    id: 3,
    number: 3,
    title: 'What a Friend We Have in Jesus',
    author: 'Joseph M. Scriven',
    category: 'Prayer',
    verses: [
      'What a friend we have in Jesus, all our sins and griefs to bear! What a privilege to carry everything to God in prayer!',
    ],
  },
  {
    id: 4,
    number: 4,
    title: 'Rock of Ages, Cleft for Me',
    author: 'Augustus M. Toplady',
    category: 'Worship',
    verses: [
      'Rock of Ages, cleft for me, let me hide myself in thee; let the water and the blood, from thy wounded side which flowed, be of sin the double cure; save from wrath and make me pure.',
    ],
  },
  {
    id: 5,
    number: 5,
    title: 'All Hail the Power of Jesus’ Name!',
    author: 'Edward Perronet',
    category: 'Praise',
    verses: [
      'All hail the power of Jesus’ name! Let angels prostrate fall; bring forth the royal diadem, and crown him Lord of all.',
    ],
  },
];