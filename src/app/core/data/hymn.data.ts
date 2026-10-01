import { Hymn } from "../models/hymn.model";
import { HYMN_LYRICS} from "./hymn-lyrics.data";

export const HYMNS: Hymn[] = [
    {
  id: 1,
  number: 1,
  title: 'Amazing Grace',
  author: 'John Newton',
  category: 'Praise',
  verses: HYMN_LYRICS.amazingGrace
},
{
  id: 2,
  number: 2,
  title: 'All Hail the Power of Jesus’ Name',
  author: 'Edward Perronet',
  category: 'Praise',
  verses: HYMN_LYRICS.allHailThePower
},
{
  id: 3,
  number: 3,
  title: 'To God Be the Glory',
  author: 'Fanny J. Crosby',
  category: 'Praise',
  verses: HYMN_LYRICS.toGodBeTheGlory
},
{
  id: 4,
  number: 4,
  title: 'Praise to the Lord, the Almighty',
  author: 'Joachim Neander / Catherine Winkworth',
  category: 'Praise',
  verses: HYMN_LYRICS.praiseToTheLord
},
{
  id: 5,
  number: 5,
  title: 'O for a Thousand Tongues to Sing',
  author: 'Charles Wesley',
  category: 'Praise',
  verses: HYMN_LYRICS.oForAThousandTongues
},
{
  id: 6,
  number: 6,
  title: 'Crown Him with Many Crowns',
  author: 'Matthew Bridges / Godfrey Thring',
  category: 'Praise',
  verses: []
},
{
  id: 7,
  number: 7,
  title: 'Holy God, We Praise Thy Name',
  author: 'Ignaz Franz / Clarence A. Walworth',
  category: 'Praise',
  verses: []
},
// Worship
{
  id: 8,
  number: 8,
  title: 'Holy, Holy, Holy! Lord God Almighty!',
  author: 'Reginald Heber',
  category: 'Worship',
  verses: []
},
{
  id: 9,
  number: 9,
  title: 'Fairest Lord Jesus',
  author: 'Anonymous',
  category: 'Worship',
  verses: []
},
{
  id: 10,
  number: 10,
  title: 'Be Thou My Vision',
  author: 'Traditional Irish Hymn',
  category: 'Worship',
  verses: []
},
{
  id: 11,
  number: 11,
  title: 'All Creatures of Our God and King',
  author: 'Francis of Assisi',
  category: 'Worship',
  verses: []
},
{
  id: 12,
  number: 12,
  title: 'Come, Thou Almighty King',
  author: 'Anonymous',
  category: 'Worship',
  verses: []
},
{
  id: 13,
  number: 13,
  title: 'Jesus, Thou Joy of Loving Hearts',
  author: 'Bernard of Clairvaux',
  category: 'Worship',
  verses: []
},
{
  id: 14,
  number: 14,
  title: 'O Worship the King',
  author: 'Robert Grant',
  category: 'Worship',
  verses: []
},

// Grace
{
  id: 15,
  number: 15,
  title: 'Grace Greater Than Our Sin',
  author: 'Julia H. Johnston',
  category: 'Grace',
  verses: []
},
{
  id: 16,
  number: 16,
  title: 'Jesus Paid It All',
  author: 'Elvina M. Hall',
  category: 'Grace',
  verses: []
},
{
  id: 17,
  number: 17,
  title: 'Rock of Ages, Cleft for Me',
  author: 'Augustus M. Toplady',
  category: 'Grace',
  verses: []
},
{
  id: 18,
  number: 18,
  title: 'Nothing but the Blood',
  author: 'Robert Lowry',
  category: 'Grace',
  verses: []
},
{
  id: 19,
  number: 19,
  title: 'Just as I Am, Without One Plea',
  author: 'Charlotte Elliott',
  category: 'Grace',
  verses: []
},
{
  id: 20,
  number: 20,
  title: 'And Can It Be',
  author: 'Charles Wesley',
  category: 'Grace',
  verses: []
},
{
  id: 21,
  number: 21,
  title: 'Beneath the Cross of Jesus',
  author: 'Elizabeth C. Clephane',
  category: 'Grace',
  verses: []
},

// Faith
{
  id: 22,
  number: 22,
  title: 'Blessed Assurance',
  author: 'Fanny J. Crosby',
  category: 'Faith',
  verses: []
},
{
  id: 23,
  number: 23,
  title: '’Tis So Sweet to Trust in Jesus',
  author: 'Louisa M. R. Stead',
  category: 'Faith',
  verses: []
},
{
  id: 24,
  number: 24,
  title: 'My Faith Looks Up to Thee',
  author: 'Ray Palmer',
  category: 'Faith',
  verses: []
},
{
  id: 25,
  number: 25,
  title: 'Standing on the Promises',
  author: 'Russell Kelso Carter',
  category: 'Faith',
  verses: []
},
{
  id: 26,
  number: 26,
  title: 'A Mighty Fortress Is Our God',
  author: 'Martin Luther',
  category: 'Faith',
  verses: []
},
{
  id: 27,
  number: 27,
  title: 'How Firm a Foundation',
  author: 'K. (attributed to George Keith / R. Keen)',
  category: 'Faith',
  verses: []
},
{
  id: 28,
  number: 28,
  title: 'Trust and Obey',
  author: 'John H. Sammis',
  category: 'Faith',
  verses: []
},
// Prayer
{
  id: 29,
  number: 29,
  title: 'What a Friend We Have in Jesus',
  author: 'Joseph M. Scriven',
  category: 'Prayer',
  verses: []
},
{
  id: 30,
  number: 30,
  title: 'Sweet Hour of Prayer',
  author: 'William W. Walford',
  category: 'Prayer',
  verses: []
},
{
  id: 31,
  number: 31,
  title: 'Pass Me Not, O Gentle Savior',
  author: 'Fanny J. Crosby',
  category: 'Prayer',
  verses: []
},
{
  id: 32,
  number: 32,
  title: 'I Need Thee Every Hour',
  author: 'Annie S. Hawks / Robert Lowry',
  category: 'Prayer',
  verses: []
},
{
  id: 33,
  number: 33,
  title: 'Take My Life and Let It Be',
  author: 'Frances R. Havergal',
  category: 'Prayer',
  verses: []
},
{
  id: 34,
  number: 34,
  title: 'Savior, Like a Shepherd Lead Us',
  author: 'Dorothy A. Thrupp',
  category: 'Prayer',
  verses: []
},
{
  id: 35,
  number: 35,
  title: 'Nearer, My God, to Thee',
  author: 'Sarah F. Adams',
  category: 'Prayer',
  verses: []
},
// Thanksgiving
{
  id: 36,
  number: 36,
  title: 'Come, Ye Thankful People, Come',
  author: 'Henry Alford',
  category: 'Thanksgiving',
  verses: []
},
{
  id: 37,
  number: 37,
  title: 'Now Thank We All Our God',
  author: 'Martin Rinkart / Catherine Winkworth',
  category: 'Thanksgiving',
  verses: []
},
{
  id: 38,
  number: 38,
  title: 'Count Your Blessings',
  author: 'Johnson Oatman Jr.',
  category: 'Thanksgiving',
  verses: []
},
{
  id: 39,
  number: 39,
  title: 'For the Beauty of the Earth',
  author: 'Folliott S. Pierpoint',
  category: 'Thanksgiving',
  verses: []
},
{
  id: 40,
  number: 40,
  title: 'We Gather Together',
  author: 'Traditional Dutch Hymn',
  category: 'Thanksgiving',
  verses: []
},
{
  id: 41,
  number: 41,
  title: 'Praise God, from Whom All Blessings Flow',
  author: 'Thomas Ken',
  category: 'Thanksgiving',
  verses: []
},
{
  id: 42,
  number: 42,
  title: 'Rejoice, Ye Pure in Heart',
  author: 'Edward H. Plumptre',
  category: 'Thanksgiving',
  verses: []
},
// Christmas
{
  id: 43,
  number: 43,
  title: 'Joy to the World',
  author: 'Isaac Watts',
  category: 'Christmas',
  verses: []
},
{
  id: 44,
  number: 44,
  title: 'O Come, All Ye Faithful',
  author: 'John Francis Wade / Frederick Oakeley',
  category: 'Christmas',
  verses: []
},
{
  id: 45,
  number: 45,
  title: 'Hark! The Herald Angels Sing',
  author: 'Charles Wesley',
  category: 'Christmas',
  verses: []
},
{
  id: 46,
  number: 46,
  title: 'Silent Night',
  author: 'Joseph Mohr',
  category: 'Christmas',
  verses: []
},
{
  id: 47,
  number: 47,
  title: 'Angels We Have Heard on High',
  author: 'Traditional French Carol',
  category: 'Christmas',
  verses: []
},
{
  id: 48,
  number: 48,
  title: 'The First Noel',
  author: 'Traditional English Carol',
  category: 'Christmas',
  verses: []
},
{
  id: 49,
  number: 49,
  title: 'Away in a Manger',
  author: 'Anonymous',
  category: 'Christmas',
  verses: []
},

// Easter
{
  id: 50,
  number: 50,
  title: 'Christ the Lord Is Risen Today',
  author: 'Charles Wesley',
  category: 'Easter',
  verses: []
},
{
  id: 51,
  number: 51,
  title: 'Jesus Christ Is Risen Today',
  author: 'Traditional Latin Hymn',
  category: 'Easter',
  verses: []
},
{
  id: 52,
  number: 52,
  title: 'The Strife Is O’er, the Battle Done',
  author: 'Traditional Latin Hymn / Francis Pott',
  category: 'Easter',
  verses: []
},
{
  id: 53,
  number: 53,
  title: 'At the Lamb’s High Feast We Sing',
  author: 'Traditional Latin Hymn / Robert Campbell',
  category: 'Easter',
  verses: []
},
{
  id: 54,
  number: 54,
  title: 'Come, Ye Faithful, Raise the Strain',
  author: 'John of Damascus / John Mason Neale',
  category: 'Easter',
  verses: []
},
{
  id: 55,
  number: 55,
  title: 'The Day of Resurrection',
  author: 'John of Damascus / John Mason Neale',
  category: 'Easter',
  verses: []
},
{
  id: 56,
  number: 56,
  title: 'O Sons and Daughters, Let Us Sing',
  author: 'Jean Tisserand / John Mason Neale',
  category: 'Easter',
  verses: []
},
];