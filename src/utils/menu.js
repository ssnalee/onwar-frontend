export const MAINMENU = [
    {
        id: "heros",
        title : "HEROS",
        subMenu : [
            {
                id: "patch-notes",
                path : '/news',
                title : '최신 패치노트',
                beta : true,
            },
            {
                id: "gallery",
                path : '/gallery',
                title : '영웅 갤러리',
                beta : true,
            }
        ]
    },
    {
        id: "battletags",
        title : "BATTLETAGS",
        subMenu : [
            {
                id: "search",
                path : '/search',
                title : '배틀태그 검색',
                beta : false,
            },
            {
                id: "manage",
                path : '/battletag',
                title : '내 배틀태그 관리',
                beta : false,
            }
        ]
    },
    {
        id: "community",
        title : "COMMUNITY",
        subMenu : [
            {
                id: "competitive",
                path : '/board/competitive',
                title : '경쟁전 파티 구함',
                beta : false,
            },
            {
                id: "quickplay",
                path : '/board/quick-play',
                title : '빠른대전 파티 구함',
                beta : false,
            },
            // {
            //     id: "promote",
            //     path : 'promote',
            //     title : '홍보 채널',
            // },
        ]
    },
]