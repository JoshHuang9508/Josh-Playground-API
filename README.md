# Josh Playgound API

## What is this

- This is API server for [Josh Playground](https://github.com/JoshHuang9508/Josh-Playground)

## API

- ### `/api/ytdl?videoId={id}`

  Get YouTube video info, using "ytdl-core" package.

  <details>
    <summary> Example return </summary>

    ```json
    {
        "embed":{
           "iframeUrl":"https://www.youtube.com/embed/N0rEDZ4mQzg",
           "width":1280,
           "height":720
        },
        "title":"Constant Moderato (Piano Arrange Ver.) - 블루아카이브 에덴조약 3장 OST | 피아노 커버 (+ 악보)",
        "description":"Constant Moderato (Piano Arrange Ver.) - 블루아카이브 에덴조약 3장 OST | 피아노 커버 (+ 악보)\nConstant Moderato (Piano Arrange Ver.) - Blue Archive Our Story OST (Piano Cover + Sheet Music)\n\n🎵 게임 : 블루아카이브\n✔️ 원곡 : https://youtu.be/36CdBLsxDxw\n💬 취미로 즐겁게 피아노를 치는 사람입니다 부족해도 양해부탁드립니다! \n💬 구독과 좋아요 부탁드려요!\n🎹 피아노 기종 : NI KOMPLETE KONTROL S88 MK2\n🎹 편곡 : 자유로운 공간\n📄 악보 : https://www.mymusicsheet.com/FreeSpacePiano/69715\n\n[ 코멘트 ]\n안녕하세요! 오늘은 블루아카이브 에덴조약 3장 OST인 Theme 87을 연주해보았습니다! 좋게 들어주셨다면 구독과 좋아요, 댓글 한 번씩 부탁드립니다! 좋은 하루 보내셔요:)\n\n#블루아카이브 #에덴조약 #피아노",
        "lengthSeconds":"180",
        "ownerProfileUrl":"http://www.youtube.com/@%EC%9E%90%EC%9C%A0%EB%A1%9C%EC%9A%B4%EA%B3%B5%EA%B0%84",
        "externalChannelId":"UCXRI-GIhLgQIok040HEFCdw",
        "isFamilySafe":true,
        "availableCountries":[
           "AD",
           "AE",
           "AF",
           "AG",
           "AI",
           "AL",
           "AM",
           "AO",
           "AQ",
           "AR",
           "AS",
           "AT",
           "AU",
           "AW",
           "AX",
           "AZ",
           "BA",
           "BB",
           "BD",
           "BE",
           "BF",
           "BG",
           "BH",
           "BI",
           "BJ",
           "BL",
           "BM",
           "BN",
           "BO",
           "BQ",
           "BR",
           "BS",
           "BT",
           "BV",
           "BW",
           "BY",
           "BZ",
           "CA",
           "CC",
           "CD",
           "CF",
           "CG",
           "CH",
           "CI",
           "CK",
           "CL",
           "CM",
           "CN",
           "CO",
           "CR",
           "CU",
           "CV",
           "CW",
           "CX",
           "CY",
           "CZ",
           "DE",
           "DJ",
           "DK",
           "DM",
           "DO",
           "DZ",
           "EC",
           "EE",
           "EG",
           "EH",
           "ER",
           "ES",
           "ET",
           "FI",
           "FJ",
           "FK",
           "FM",
           "FO",
           "FR",
           "GA",
           "GB",
           "GD",
           "GE",
           "GF",
           "GG",
           "GH",
           "GI",
           "GL",
           "GM",
           "GN",
           "GP",
           "GQ",
           "GR",
           "GS",
           "GT",
           "GU",
           "GW",
           "GY",
           "HK",
           "HM",
           "HN",
           "HR",
           "HT",
           "HU",
           "ID",
           "IE",
           "IL",
           "IM",
           "IN",
           "IO",
           "IQ",
           "IR",
           "IS",
           "IT",
           "JE",
           "JM",
           "JO",
           "JP",
           "KE",
           "KG",
           "KH",
           "KI",
           "KM",
           "KN",
           "KP",
           "KR",
           "KW",
           "KY",
           "KZ",
           "LA",
           "LB",
           "LC",
           "LI",
           "LK",
           "LR",
           "LS",
           "LT",
           "LU",
           "LV",
           "LY",
           "MA",
           "MC",
           "MD",
           "ME",
           "MF",
           "MG",
           "MH",
           "MK",
           "ML",
           "MM",
           "MN",
           "MO",
           "MP",
           "MQ",
           "MR",
           "MS",
           "MT",
           "MU",
           "MV",
           "MW",
           "MX",
           "MY",
           "MZ",
           "NA",
           "NC",
           "NE",
           "NF",
           "NG",
           "NI",
           "NL",
           "NO",
           "NP",
           "NR",
           "NU",
           "NZ",
           "OM",
           "PA",
           "PE",
           "PF",
           "PG",
           "PH",
           "PK",
           "PL",
           "PM",
           "PN",
           "PR",
           "PS",
           "PT",
           "PW",
           "PY",
           "QA",
           "RE",
           "RO",
           "RS",
           "RU",
           "RW",
           "SA",
           "SB",
           "SC",
           "SD",
           "SE",
           "SG",
           "SH",
           "SI",
           "SJ",
           "SK",
           "SL",
           "SM",
           "SN",
           "SO",
           "SR",
           "SS",
           "ST",
           "SV",
           "SX",
           "SY",
           "SZ",
           "TC",
           "TD",
           "TF",
           "TG",
           "TH",
           "TJ",
           "TK",
           "TL",
           "TM",
           "TN",
           "TO",
           "TR",
           "TT",
           "TV",
           "TW",
           "TZ",
           "UA",
           "UG",
           "UM",
           "US",
           "UY",
           "UZ",
           "VA",
           "VC",
           "VE",
           "VG",
           "VI",
           "VN",
           "VU",
           "WF",
           "WS",
           "YE",
           "YT",
           "ZA",
           "ZM",
           "ZW"
        ],
        "isUnlisted":false,
        "hasYpcMetadata":false,
        "viewCount":"170743",
        "category":"Music",
        "publishDate":"2022-02-14T00:00:12-08:00",
        "ownerChannelName":"자유로운 공간 / FreeSpace Piano",
        "liveBroadcastDetails":{
           "isLiveNow":false,
           "startTimestamp":"2022-02-14T08:00:12+00:00",
           "endTimestamp":"2022-02-14T08:05:05+00:00"
        },
        "uploadDate":"2022-02-14T00:00:12-08:00",
        "isShortsEligible":false,
        "videoId":"N0rEDZ4mQzg",
        "keywords":[
           "블루아카이브",
           "에덴조약",
           "피아노",
           "블루 아카이브",
           "블루 아카이브 pv",
           "blue archive",
           "blue archive ost",
           "블루 아카이브 피아노",
           "ブルーアーカイブ ost",
           "blue archive bgm",
           "blue archive piano",
           "블루 아카이브 ost",
           "블루 아카이브 노래",
           "블루 아카이브 브금",
           "에덴 조약",
           "constant moderato",
           "그 브금",
           "블루아카이브 브금",
           "ブルーアーカイブ 音楽",
           "blue archive music",
           "블루아카 ost",
           "ブルーアーカ ピアノ",
           "블루 아카이브 bgm",
           "블루 아카이브 피아노 악보"
        ],
        "channelId":"UCXRI-GIhLgQIok040HEFCdw",
        "isOwnerViewing":false,
        "isCrawlable":true,
        "allowRatings":true,
        "author":{
           "id":"UCXRI-GIhLgQIok040HEFCdw",
           "name":"자유로운 공간 / FreeSpace Piano",
           "user":"@%EC%9E%90%EC%9C%A0%EB%A1%9C%EC%9A%B4%EA%B3%B5%EA%B0%84",
           "channel_url":"https://www.youtube.com/channel/UCXRI-GIhLgQIok040HEFCdw",
           "external_channel_url":"https://www.youtube.com/channel/UCXRI-GIhLgQIok040HEFCdw",
           "user_url":"http://www.youtube.com/@%EC%9E%90%EC%9C%A0%EB%A1%9C%EC%9A%B4%EA%B3%B5%EA%B0%84",
           "thumbnails":[
              {
                 "url":"https://yt3.ggpht.com/J1eCSJbM7b-NGCoQd7XDUK1RMO0drbkqF4jVmjslZm0wmklNKs_m_pqPd1UJCa2b-p2sFrDG9Q=s48-c-k-c0x00ffffff-no-rj",
                 "width":48,
                 "height":48
              },
              {
                 "url":"https://yt3.ggpht.com/J1eCSJbM7b-NGCoQd7XDUK1RMO0drbkqF4jVmjslZm0wmklNKs_m_pqPd1UJCa2b-p2sFrDG9Q=s88-c-k-c0x00ffffff-no-rj",
                 "width":88,
                 "height":88
              },
              {
                 "url":"https://yt3.ggpht.com/J1eCSJbM7b-NGCoQd7XDUK1RMO0drbkqF4jVmjslZm0wmklNKs_m_pqPd1UJCa2b-p2sFrDG9Q=s176-c-k-c0x00ffffff-no-rj",
                 "width":176,
                 "height":176
              }
           ],
           "verified":false,
           "subscriber_count":10300
        },
        "isLowLatencyLiveStream":false,
        "isPrivate":false,
        "isUnpluggedCorpus":false,
        "latencyClass":"MDE_STREAM_OPTIMIZATIONS_RENDERER_LATENCY_NORMAL",
        "isLiveContent":false,
        "media":{
           
        },
        "likes":null,
        "dislikes":null,
        "age_restricted":false,
        "video_url":"https://www.youtube.com/watch?v=N0rEDZ4mQzg",
        "storyboards":[
           {
              "templateUrl":"https://i.ytimg.com/sb/N0rEDZ4mQzg/storyboard3_L0/default.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgj49ZSpBg%3D%3D&sigh=rs%24AOn4CLAK3LClDU5yrsW88JTYR4HntJnBuQ",
              "thumbnailWidth":48,
              "thumbnailHeight":27,
              "thumbnailCount":100,
              "interval":0,
              "columns":10,
              "rows":10,
              "storyboardCount":1
           },
           {
              "templateUrl":"https://i.ytimg.com/sb/N0rEDZ4mQzg/storyboard3_L1/M$M.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgj49ZSpBg%3D%3D&sigh=rs%24AOn4CLCiTPs5UF4yVjA1SBFGxNmm_uyhBA",
              "thumbnailWidth":80,
              "thumbnailHeight":45,
              "thumbnailCount":91,
              "interval":2000,
              "columns":10,
              "rows":10,
              "storyboardCount":1
           },
           {
              "templateUrl":"https://i.ytimg.com/sb/N0rEDZ4mQzg/storyboard3_L2/M$M.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgj49ZSpBg%3D%3D&sigh=rs%24AOn4CLAzvozt5bikcyXICm-1qWvUP46Ohg",
              "thumbnailWidth":160,
              "thumbnailHeight":90,
              "thumbnailCount":91,
              "interval":2000,
              "columns":5,
              "rows":5,
              "storyboardCount":4
           },
           {
              "templateUrl":"https://i.ytimg.com/sb/N0rEDZ4mQzg/storyboard3_L3/M$M.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgj49ZSpBg%3D%3D&sigh=rs%24AOn4CLCuwm8h6aACTE2cJH0Ed-EFcTGhJw",
              "thumbnailWidth":320,
              "thumbnailHeight":180,
              "thumbnailCount":91,
              "interval":2000,
              "columns":3,
              "rows":3,
              "storyboardCount":11
           }
        ],
        "chapters":[
           
        ],
        "thumbnails":[
           {
              "url":"https://i.ytimg.com/vi/N0rEDZ4mQzg/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAqHOPlK4XTNhYkJ5AeaE6xt24KpQ",
              "width":168,
              "height":94
           },
           {
              "url":"https://i.ytimg.com/vi/N0rEDZ4mQzg/hqdefault.jpg?sqp=-oaymwEbCMQBEG5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAuh8JlM89HjK5DdxqQdLaibhb0gg",
              "width":196,
              "height":110
           },
           {
              "url":"https://i.ytimg.com/vi/N0rEDZ4mQzg/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCp0jX6Bljxl1gPvD-RV9JSQU27DQ",
              "width":246,
              "height":138
           },
           {
              "url":"https://i.ytimg.com/vi/N0rEDZ4mQzg/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCV5nU0IoMI3T0QrGEPRnOLG0CvUg",
              "width":336,
              "height":188
           },https://github.com/JoshHuang9508/Josh-Playground-API/blob/main/README.md
           {
              "url":"https://i.ytimg.com/vi_webp/N0rEDZ4mQzg/maxresdefault.webp?v=62e1a790",
              "width":1920,
              "height":1080
           }
        ]
     }
    ```
  </details>

- ### `/api/ytpl?playlistId={id}`

  Get YouTube playlist info, using "ytpl" package.

  <details>
    <summary> Example return </summary>

    ```json
    {
      "id": "PLlaxXCMiGQ4Qq6hwXO77bwzFsu8Bz7ypi",
      "url": "https://www.youtube.com/playlist?list=PLlaxXCMiGQ4Qq6hwXO77bwzFsu8Bz7ypi",
      "title": "Nightcore",
      "estimatedItemCount": 88,
      "views": 1468,
      "thumbnails": [
        {
          "url": "https://i.ytimg.com/vi/89PonhzEi30/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLArkNBeR92mOKcrTZTPP9T1R6dLmA",
          "width": 336,
          "height": 188
        },
        {
          "url": "https://i.ytimg.com/vi/89PonhzEi30/hqdefault.jpg?sqp=-oaymwEXCPYBEIoBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA9JFVCaTdhwZc69BtbdQs4Cj0bHw",
          "width": 246,
          "height": 138
        },
        {
          "url": "https://i.ytimg.com/vi/89PonhzEi30/hqdefault.jpg?sqp=-oaymwEWCMQBEG5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLDRewAVj1nrdm32UW4ncCwNSUl9Eg",
          "width": 196,
          "height": 110
        },
        {
          "url": "https://i.ytimg.com/vi/89PonhzEi30/hqdefault.jpg?sqp=-oaymwEWCKgBEF5IWvKriqkDCQgBFQAAiEIYAQ==&rs=AOn4CLDF5uw_2iVuvpIvElH4_do3srcfIw",
          "width": 168,
          "height": 94
        }
      ],
      "bestThumbnail": {
        "url": "https://i.ytimg.com/vi/89PonhzEi30/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLArkNBeR92mOKcrTZTPP9T1R6dLmA",
        "width": 336,
        "height": 188
      },
      "lastUpdated": "Updated today",
      "description": "",
      "visibility": "everyone",
      "author": {
        "name": "Whydog",
        "url": "https://www.youtube.com/@whydog5555",
        "avatars": [
          {
            "url": "https://yt3.ggpht.com/3yemaj5edkPX7AAYWes1mPI-iMgsNveRhgHoahUOm3ZOjYvltfkUBqbwyfmTGqsVGswA8SoG=s176-c-k-c0x00ffffff-no-rj",
            "width": 176,
            "height": 176
          },
          {
            "url": "https://yt3.ggpht.com/3yemaj5edkPX7AAYWes1mPI-iMgsNveRhgHoahUOm3ZOjYvltfkUBqbwyfmTGqsVGswA8SoG=s88-c-k-c0x00ffffff-no-rj",
            "width": 88,
            "height": 88
          },
          {
            "url": "https://yt3.ggpht.com/3yemaj5edkPX7AAYWes1mPI-iMgsNveRhgHoahUOm3ZOjYvltfkUBqbwyfmTGqsVGswA8SoG=s48-c-k-c0x00ffffff-no-rj",
            "width": 48,
            "height": 48
          }
        ],
        "bestAvatar": {
          "url": "https://yt3.ggpht.com/3yemaj5edkPX7AAYWes1mPI-iMgsNveRhgHoahUOm3ZOjYvltfkUBqbwyfmTGqsVGswA8SoG=s176-c-k-c0x00ffffff-no-rj",
          "width": 176,
          "height": 176
        },
        "channelID": "UCSCPzKDoKrYmgBZeQZLU5cg"
      },
      "items": [
        {
          "title": "Nightcore - Flares",
          "index": 1,
          "id": "89PonhzEi30",
          "shortUrl": "https://www.youtube.com/watch?v=89PonhzEi30",
          "url": "https://www.youtube.com/watch?v=89PonhzEi30&list=PLlaxXCMiGQ4Qq6hwXO77bwzFsu8Bz7ypi&index=1&pp=iAQB8AUB",
          "author": {
            "url": "https://www.youtube.com/@SyrexNightcore",
            "channelID": "UCeZje_7vr6CPK9vPQDfV3WA",
            "name": "Syrex"
          },
          "thumbnails": [
            {
              "url": "https://i.ytimg.com/vi/89PonhzEi30/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDDa8DoBelPJmat3_6NecB0yTzDlA",
              "width": 336,
              "height": 188
            },
            {
              "url": "https://i.ytimg.com/vi/89PonhzEi30/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDwATrDMzYUUkwbQT2nfPXnP4NTng",
              "width": 246,
              "height": 138
            },
            {
              "url": "https://i.ytimg.com/vi/89PonhzEi30/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLAiS4sUzIoDWsF5pYaGWaerZdZEwg",
              "width": 196,
              "height": 110
            },
            {
              "url": "https://i.ytimg.com/vi/89PonhzEi30/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCYzfnwygol-56snM-DkWAZ-sk3uw",
              "width": 168,
              "height": 94
            }
          ],
          "bestThumbnail": {
            "url": "https://i.ytimg.com/vi/89PonhzEi30/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDDa8DoBelPJmat3_6NecB0yTzDlA",
            "width": 336,
            "height": 188
          },
          "isLive": false,
          "duration": "2:58",
          "durationSec": 178,
          "isPlayable": true
        },
        {
          "title": "Nightcore - All Falls Down - (Alan Walker / Lyrics)",
          "index": 2,
          "id": "2GG8xQDH2cI",
          "shortUrl": "https://www.youtube.com/watch?v=2GG8xQDH2cI",
          "url": "https://www.youtube.com/watch?v=2GG8xQDH2cI&list=PLlaxXCMiGQ4Qq6hwXO77bwzFsu8Bz7ypi&index=2&pp=iAQB8AUB",
          "author": {
            "url": "https://www.youtube.com/@SyrexNightcore",
            "channelID": "UCeZje_7vr6CPK9vPQDfV3WA",
            "name": "Syrex"
          },
          "thumbnails": [
            {
              "url": "https://i.ytimg.com/vi/2GG8xQDH2cI/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBS0KFs3UWv3FgGuDgm2MCb65n-rw",
              "width": 336,
              "height": 188
            },
            {
              "url": "https://i.ytimg.com/vi/2GG8xQDH2cI/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAjCkv0t9Zjz2SOE2RRYME6Bg92Fg",
              "width": 246,
              "height": 138
            },
            {
              "url": "https://i.ytimg.com/vi/2GG8xQDH2cI/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLB9DCebAHdMrf8j-cpnRQjO8n-lUw",
              "width": 196,
              "height": 110
            },
            {
              "url": "https://i.ytimg.com/vi/2GG8xQDH2cI/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDGDf8y9VzHOGDUguLvMBKnGTk7cQ",
              "width": 168,
              "height": 94
            }
          ],
          "bestThumbnail": {
            "url": "https://i.ytimg.com/vi/2GG8xQDH2cI/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBS0KFs3UWv3FgGuDgm2MCb65n-rw",
            "width": 336,
            "height": 188
          },
          "isLive": false,
          "duration": "2:55",
          "durationSec": 175,
          "isPlayable": true
        },
        {
          "title": "Nightcore - Home - (Lyrics)",
          "index": 3,
          "id": "XX605I5lYbA",
          "shortUrl": "https://www.youtube.com/watch?v=XX605I5lYbA",
          "url": "https://www.youtube.com/watch?v=XX605I5lYbA&list=PLlaxXCMiGQ4Qq6hwXO77bwzFsu8Bz7ypi&index=3&pp=iAQB8AUB",
          "author": {
            "url": "https://www.youtube.com/@SyrexNightcore",
            "channelID": "UCeZje_7vr6CPK9vPQDfV3WA",
            "name": "Syrex"
          },
          "thumbnails": [
            {
              "url": "https://i.ytimg.com/vi/XX605I5lYbA/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAHbYik9FVP4iaf-OfOylmARXgE6A",
              "width": 336,
              "height": 188
            },
            {
              "url": "https://i.ytimg.com/vi/XX605I5lYbA/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCuC9qYVFwfVm_Mq_d9GTMepJ6V3w",
              "width": 246,
              "height": 138
            },
            {
              "url": "https://i.ytimg.com/vi/XX605I5lYbA/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLB61yXdUQZaB48hLcMa8VhXyOO1Zg",
              "width": 196,
              "height": 110
            },
            {
              "url": "https://i.ytimg.com/vi/XX605I5lYbA/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLCQv_XK1E1LOdlw8xxApJEG19Mv0A",
              "width": 168,
              "height": 94
            }
          ],
          "bestThumbnail": {
            "url": "https://i.ytimg.com/vi/XX605I5lYbA/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAHbYik9FVP4iaf-OfOylmARXgE6A",
            "width": 336,
            "height": 188
          },
          "isLive": false,
          "duration": "3:09",
          "durationSec": 189,
          "isPlayable": true
        }
      ],
      "continuation": null
    }
    ```
  </details>
  
## WebSocket (emit)

- ### `join`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("join", username: string)
    ```
  </details>

- ### `addLog`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("addLog", log: string)
    ```
  </details> 

- ### `setUsername`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("setUsername", username: string)
    ```
  </details> 

- ### `setPlayerState`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("setPlayerState", playerState: {
      playing: boolean,
      played: number,
      playedSeconds: number,
      loaded: number,
      loadedSeconds: number,
      duration: number,
      playbackRate: number,
      loop: boolean,
      trackQueue: {
        url: string, //https://www.youtube.com/watch?v={id}
        title: string,
        author: string,
        img: string, //https://img.youtube.com/vi/{id}/default.jpg
        requestBy: string,
        id: number,
      }[],
      index: number
    })
    ```
  </details> 

- ### `onDuration`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("onDuration", duration: number)
    ```
  </details> 

- ### `onProgress`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("onProgress", state: {
      played: number,
      playedSeconds: number,
      loaded: number,
      loadedSeconds: number
    })
    ```
  </details> 

- ### `onEnd`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("onEnd")
    ```
  </details> 

- ### `play`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("play")
    ```
  </details> 

- ### `pause`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("pause")
    ```
  </details> 

- ### `refresh`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("refresh")
    ```
  </details> 

- ### `addTrack`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("addTrack", track: {
      url: string, //https://www.youtube.com/watch?v={id}
      title: string,
      author: string,
      img: string, //https://img.youtube.com/vi/{id}/default.jpg
      requestBy: string,
      id: number,
    })
    ```
  </details> 

- ### `addTracks`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("addTracks", tracks: {
      url: string, //https://www.youtube.com/watch?v={id}
      title: string,
      author: string,
      img: string, //https://img.youtube.com/vi/{id}/default.jpg
      requestBy: string,
      id: number,
    }[])
    ```
  </details> 

- ### `removeTrack`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("removeTrack", index: number)
    ```
  </details> 

- ### `setTrackQueue`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("setTrackQueue", trackQueue: {
      url: string, //https://www.youtube.com/watch?v={id}
      title: string,
      author: string,
      img: string, //https://img.youtube.com/vi/{id}/default.jpg
      requestBy: string,
      id: number,
    }[])
    ```
  </details> 

- ### `nextTrack`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("nextTrack")
    ```
  </details> 

- ### `prevTrack`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("prevTrack")
    ```
  </details> 

- ### `setTrackIndex`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("setTrackIndex", index: number)
    ```
  </details> 

- ### `setPlaybackRate`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("setPlaybackRate", rate: number)
    ```
  </details> 

- ### `setLoop`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("setLoop", loop: boolean)
    ```
  </details> 

- ### `setRandom`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("setRandom", random: boolean)
    ```
  </details> 

- ### `seek`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("seek", time: number)
    ```
  </details> 

## WebSocket (on)

- ### `receiveLog`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.on("receiveLog", (data) => ())
    ```
  </details> 

  <details>
    <summary> Example data </summary>

    ```json
    [
      "example log1",
      "example log2",
      "..."
    ]
    ```
  </details> 

- ### `receiveUsers`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.on("receiveUsers", (data) => ())
    ```
  </details> 

  <details>
    <summary> Example data </summary>

    ```json
    {
      "{socket.id}": "example username"
    }
    ```
  </details> 

- ### `receivePlayerState`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.on("receivePlayerState", (data) => ())
    ```
  </details> 

  <details>
    <summary> Example data </summary>

    ```json
    {
      "playing": true,
      "played": 0,
      "playedSeconds": 0,
      "loaded": 0,
      "loadedSeconds": 0,
      "duration": 0,
      "playbackRate": 1,
      "loop": false,
      "trackQueue": {
        "url": "https://www.youtube.com/watch?v={id}"
        "title": "example title",
        "author": "example author",
        "img": "https://img.youtube.com/vi/{id}/default.jpg"
        "requestBy": "example user",
        "id": 0
      }[],
      "index": 0
    }
    ```
  </details> 

- ### `seek`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.on("seek", (data) => ())
    ```
  </details> 

  <details>
    <summary> Example data </summary>

    ```
    120
    ```
  </details> 
