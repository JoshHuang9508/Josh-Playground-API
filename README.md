# Josh Playgound API

## What is this

- This is API server for [Josh Playground]([/guides/content/editing-an-existing-page](https://github.com/JoshHuang9508/Josh-Playground)

## API

- ### `/api/ytdl?videoId={id}`

  Get YouTube video info, using "ytdl-core" package.

  <details>
    <summary> Example return </summary>

    ```
  {
    embed: {
      iframeUrl: "https://www.youtube.com/embed/N0rEDZ4mQzg",
      width: 1280,
      height: 720,
    },
    title:
      "Constant Moderato (Piano Arrange Ver.) - 블루아카이브 에덴조약 3장 OST | 피아노 커버 (+ 악보)",
    description:
      "Constant Moderato (Piano Arrange Ver.) - 블루아카이브 에덴조약 3장 OST | 피아노 커버 (+ 악보)\nConstant Moderato (Piano Arrange Ver.) - Blue Archive Our Story OST (Piano Cover + Sheet Music)\n\n🎵 게임 : 블루아카이브\n✔️ 원곡 : https://youtu.be/36CdBLsxDxw\n💬 취미로 즐겁게 피아노를 치는 사람입니다 부족해도 양해부탁드립니다! \n💬 구독과 좋아요 부탁드려요!\n🎹 피아노 기종 : NI KOMPLETE KONTROL S88 MK2\n🎹 편곡 : 자유로운 공간\n📄 악보 : https://www.mymusicsheet.com/FreeSpacePiano/69715\n\n[ 코멘트 ]\n안녕하세요! 오늘은 블루아카이브 에덴조약 3장 OST인 Theme 87을 연주해보았습니다! 좋게 들어주셨다면 구독과 좋아요, 댓글 한 번씩 부탁드립니다! 좋은 하루 보내셔요:)\n\n#블루아카이브 #에덴조약 #피아노",
    lengthSeconds: "180",
    ownerProfileUrl:
      "http://www.youtube.com/@%EC%9E%90%EC%9C%A0%EB%A1%9C%EC%9A%B4%EA%B3%B5%EA%B0%84",
    externalChannelId: "UCXRI-GIhLgQIok040HEFCdw",
    isFamilySafe: true,
    availableCountries: [
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
      "ZW",
    ],
    isUnlisted: false,
    hasYpcMetadata: false,
    viewCount: "170743",
    category: "Music",
    publishDate: "2022-02-14T00:00:12-08:00",
    ownerChannelName: "자유로운 공간 / FreeSpace Piano",
    liveBroadcastDetails: {
      isLiveNow: false,
      startTimestamp: "2022-02-14T08:00:12+00:00",
      endTimestamp: "2022-02-14T08:05:05+00:00",
    },
    uploadDate: "2022-02-14T00:00:12-08:00",
    isShortsEligible: false,
    videoId: "N0rEDZ4mQzg",
    keywords: [
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
      "블루 아카이브 피아노 악보",
    ],
    channelId: "UCXRI-GIhLgQIok040HEFCdw",
    isOwnerViewing: false,
    isCrawlable: true,
    allowRatings: true,
    author: {
      id: "UCXRI-GIhLgQIok040HEFCdw",
      name: "자유로운 공간 / FreeSpace Piano",
      user: "@%EC%9E%90%EC%9C%A0%EB%A1%9C%EC%9A%B4%EA%B3%B5%EA%B0%84",
      channel_url: "https://www.youtube.com/channel/UCXRI-GIhLgQIok040HEFCdw",
      external_channel_url:
        "https://www.youtube.com/channel/UCXRI-GIhLgQIok040HEFCdw",
      user_url:
        "http://www.youtube.com/@%EC%9E%90%EC%9C%A0%EB%A1%9C%EC%9A%B4%EA%B3%B5%EA%B0%84",
      thumbnails: [
        {
          url: "https://yt3.ggpht.com/J1eCSJbM7b-NGCoQd7XDUK1RMO0drbkqF4jVmjslZm0wmklNKs_m_pqPd1UJCa2b-p2sFrDG9Q=s48-c-k-c0x00ffffff-no-rj",
          width: 48,
          height: 48,
        },
        {
          url: "https://yt3.ggpht.com/J1eCSJbM7b-NGCoQd7XDUK1RMO0drbkqF4jVmjslZm0wmklNKs_m_pqPd1UJCa2b-p2sFrDG9Q=s88-c-k-c0x00ffffff-no-rj",
          width: 88,
          height: 88,
        },
        {
          url: "https://yt3.ggpht.com/J1eCSJbM7b-NGCoQd7XDUK1RMO0drbkqF4jVmjslZm0wmklNKs_m_pqPd1UJCa2b-p2sFrDG9Q=s176-c-k-c0x00ffffff-no-rj",
          width: 176,
          height: 176,
        },
      ],
      verified: false,
      subscriber_count: 10300,
    },
    isLowLatencyLiveStream: false,
    isPrivate: false,
    isUnpluggedCorpus: false,
    latencyClass: "MDE_STREAM_OPTIMIZATIONS_RENDERER_LATENCY_NORMAL",
    isLiveContent: false,
    media: {},
    likes: null,
    dislikes: null,
    age_restricted: false,
    video_url: "https://www.youtube.com/watch?v=N0rEDZ4mQzg",
    storyboards: [
      {
        templateUrl:
          "https://i.ytimg.com/sb/N0rEDZ4mQzg/storyboard3_L0/default.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgj49ZSpBg%3D%3D&sigh=rs%24AOn4CLAK3LClDU5yrsW88JTYR4HntJnBuQ",
        thumbnailWidth: 48,
        thumbnailHeight: 27,
        thumbnailCount: 100,
        interval: 0,
        columns: 10,
        rows: 10,
        storyboardCount: 1,
      },
      {
        templateUrl:
          "https://i.ytimg.com/sb/N0rEDZ4mQzg/storyboard3_L1/M$M.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgj49ZSpBg%3D%3D&sigh=rs%24AOn4CLCiTPs5UF4yVjA1SBFGxNmm_uyhBA",
        thumbnailWidth: 80,
        thumbnailHeight: 45,
        thumbnailCount: 91,
        interval: 2000,
        columns: 10,
        rows: 10,
        storyboardCount: 1,
      },
      {
        templateUrl:
          "https://i.ytimg.com/sb/N0rEDZ4mQzg/storyboard3_L2/M$M.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgj49ZSpBg%3D%3D&sigh=rs%24AOn4CLAzvozt5bikcyXICm-1qWvUP46Ohg",
        thumbnailWidth: 160,
        thumbnailHeight: 90,
        thumbnailCount: 91,
        interval: 2000,
        columns: 5,
        rows: 5,
        storyboardCount: 4,
      },
      {
        templateUrl:
          "https://i.ytimg.com/sb/N0rEDZ4mQzg/storyboard3_L3/M$M.jpg?sqp=-oaymwENSDfyq4qpAwVwAcABBqLzl_8DBgj49ZSpBg%3D%3D&sigh=rs%24AOn4CLCuwm8h6aACTE2cJH0Ed-EFcTGhJw",
        thumbnailWidth: 320,
        thumbnailHeight: 180,
        thumbnailCount: 91,
        interval: 2000,
        columns: 3,
        rows: 3,
        storyboardCount: 11,
      },
    ],
    chapters: [],
    thumbnails: [
      {
        url: "https://i.ytimg.com/vi/N0rEDZ4mQzg/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAqHOPlK4XTNhYkJ5AeaE6xt24KpQ",
        width: 168,
        height: 94,
      },
      {
        url: "https://i.ytimg.com/vi/N0rEDZ4mQzg/hqdefault.jpg?sqp=-oaymwEbCMQBEG5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAuh8JlM89HjK5DdxqQdLaibhb0gg",
        width: 196,
        height: 110,
      },
      {
        url: "https://i.ytimg.com/vi/N0rEDZ4mQzg/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCp0jX6Bljxl1gPvD-RV9JSQU27DQ",
        width: 246,
        height: 138,
      },
      {
        url: "https://i.ytimg.com/vi/N0rEDZ4mQzg/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCV5nU0IoMI3T0QrGEPRnOLG0CvUg",
        width: 336,
        height: 188,
      },
      {
        url: "https://i.ytimg.com/vi_webp/N0rEDZ4mQzg/maxresdefault.webp?v=62e1a790",
        width: 1920,
        height: 1080,
      },
    ],
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

- ### `setLog`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("setLog", logs: string[])
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

- ### `getPlayerState`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("getPlayerState")
    ```
  </details>

- ### `updatePlayerState`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.emit("updatePlayerState", playerState: {
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

- ### `getPlayerState`

  <details>
    <summary> Example usage </summary>

    ```js
    socket.on("getPlayerState", (data) => ())
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
