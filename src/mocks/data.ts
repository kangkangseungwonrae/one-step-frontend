export type TaskItem = {
  id: number;
  keyword: string;
  task: string;
  time: 60 | 300 | 600;
};
export type TaskDict = Record<number, TaskItem>;

/**
 * 캐러셀에 표시할 할 일 목록 (id, 키워드, 할 일, 예상 소요 시간)
 * 추후 API 연동 시 대체 예정
 */
export const CAROUSEL_MOCK_DATA: TaskItem[] = [
  { id: 1, keyword: '침대', task: '침대 머리맡 3분 정돈(베개·이불 각도 맞추기)', time: 60 },
  { id: 2, keyword: '책상', task: '책상 위 물건 3개 제자리 두기', time: 60 },
  { id: 3, keyword: '소파', task: '소파 주변 쿠션·담요 정리하기', time: 300 },
  { id: 4, keyword: '주방', task: '싱크대 주변 3분 정리(컵 1–2개 씻거나 닦기)', time: 300 },
  { id: 5, keyword: '밝은 공간', task: '커튼 열고 햇빛 드는 곳에 2분 앉기', time: 60 },
  { id: 6, keyword: '아늑한 공간', task: '조명 낮추고 담요/쿠션 편안하게 세팅하기', time: 60 },
  { id: 7, keyword: '중립 공간', task: '현재 조명만 살짝 조절해 ‘딱 좋은’ 밝기 만들기', time: 60 },
  { id: 8, keyword: '음악', task: '좋아하는 장르 1곡 듣기', time: 300 },
  { id: 9, keyword: '영상', task: '짧은 영상 1개 보기', time: 60 },
  { id: 10, keyword: '독서', task: '책/웹툰 3–5페이지 읽기', time: 60 },
  { id: 11, keyword: '게임', task: '가벼운 게임 5–10분', time: 60 },
  { id: 12, keyword: '팝', task: '기분 가벼워지는 팝 1곡', time: 60 },
  { id: 13, keyword: '인디', task: '잔잔한 인디 1곡', time: 60 },
  { id: 14, keyword: '재즈', task: '재즈 플레이리스트 1곡', time: 60 },
  { id: 15, keyword: '로파이', task: '로파이 사운드 5분 틀기', time: 300 },
  { id: 16, keyword: '공원', task: '공원 입구까지만 다녀오기', time: 60 },
  { id: 17, keyword: '카페', task: '근처 카페 가서 앉아있기 10분', time: 600 },
  { id: 18, keyword: '편의점', task: '편의점 다녀오기', time: 600 },
  { id: 19, keyword: '없음', task: '집 앞 건물 입구까지만 갔다 오기', time: 60 },
  { id: 20, keyword: '산책', task: '5–10분 산책', time: 600 },
  { id: 21, keyword: '쓰다듬기', task: '3분 쓰다듬기', time: 300 },
  { id: 22, keyword: '놀이', task: '장난감으로 5분 놀기', time: 300 },
  { id: 23, keyword: '휴식', task: '옆에 함께 앉아 쉬기', time: 60 },
  { id: 24, keyword: '성장 확인', task: '새 잎/상태 1분 확인하기', time: 60 },
  { id: 25, keyword: '차분해짐', task: '식물 옆에서 30초 머물기', time: 60 },
  { id: 26, keyword: '책상', task: '책상 위 정리 5분', time: 300 },
  { id: 27, keyword: '침대 옆', task: '침대 옆 테이블 정리', time: 300 },
  { id: 28, keyword: '주방', task: '싱크대·식탁 정돈', time: 600 },
  { id: 29, keyword: '거실', task: '소파·테이블 주변 정리', time: 300 },
  { id: 30, keyword: '시트러스', task: '상쾌한 향 로션/퍼퓸 손목에 바르기', time: 60 },
  { id: 31, keyword: '플로럴', task: '꽃향 핸드크림/미스트 사용하기', time: 60 },
  { id: 32, keyword: '우디', task: '우디향 제품 손등에 바르기', time: 60 },
  { id: 33, keyword: '비누향', task: '비누향 핸드워시로 손 씻기', time: 60 },
  { id: 34, keyword: '아침', task: '가장 편한 아침 한 끼 챙기기(토스트/요거트/바나나 등)', time: 600 },
  { id: 35, keyword: '점심', task: '점심 메뉴 미리 정해서 바로 먹기', time: 60 },
  { id: 36, keyword: '저녁', task: '저녁을 ‘한 메뉴’로 간단히 완성해 먹기', time: 60 },
  { id: 37, keyword: '한식', task: '밥+반찬 1–2개로 한 끼 정식처럼 먹기', time: 600 },
  { id: 38, keyword: '면류', task: '좋아하는 면(라면/국수/파스타)으로 한 끼 먹기', time: 600 },
  { id: 39, keyword: '빵', task: '빵+우유/커피로 빠른 한 끼 세팅', time: 600 },
  { id: 40, keyword: '간식', task: '간식에 단백질/과일을 곁들여 ‘끼니’로 만들기', time: 300 },
  { id: 41, keyword: '퍼즐', task: '퍼즐/퀴즈 1개 풀기', time: 300 },
  { id: 42, keyword: '그림', task: '메모장에 낙서 3분', time: 300 },
  { id: 43, keyword: '저널링', task: '한 줄 일기 쓰기', time: 300 },
  { id: 44, keyword: '없음', task: '음악/영상 중 하나 3분만 하기', time: 60 },
  { id: 45, keyword: '자주 연락', task: '가까운 사람 1명에게 안부 보내기', time: 60 },
  { id: 46, keyword: '필요할 때만', task: '필수 연락 1건만 처리하기(가족/업무/학교)', time: 60 },
  { id: 47, keyword: '가족', task: '가족에게 짧은 메시지 1개', time: 60 },
  { id: 48, keyword: '친구', task: '친구에게 “잘 지내?” 보내기', time: 60 },
  { id: 49, keyword: '파트너', task: '연인/썸상대에 근황 공유', time: 60 },
  { id: 50, keyword: '없음', task: '연락 대신 자기 돌봄 행동(차/산책/음악)', time: 600 },
  { id: 51, keyword: '라이트', task: '눈앞 3개만 치우기', time: 60 },
  { id: 52, keyword: '미디엄', task: '한 공간 5분 정리(책상/화장대 등)', time: 300 },
  { id: 53, keyword: '딥', task: '한 면 전체 정리(침대 주변/책상 전체 등)', time: 600 },
  { id: 54, keyword: '뜨거운 물', task: '뜨거운 물로 짧게 샤워하며 피로 풀기', time: 600 },
  { id: 55, keyword: '따뜻한 물', task: '따뜻한 물로 편안한 샤워', time: 600 },
  { id: 56, keyword: '차가운 물', task: '미온수/약간 차가운 물로 상쾌 샤워', time: 600 },
  { id: 57, keyword: '목', task: '목 스트레칭 1분', time: 300 },
  { id: 58, keyword: '등', task: '허리/등 스트레칭 1분', time: 300 },
  { id: 59, keyword: '다리', task: '다리 풀기 1분', time: 300 },
  { id: 60, keyword: '어깨', task: '어깨 회전 1분', time: 60 },
  { id: 61, keyword: '보기 좋음', task: '잎 닦기/받침대 정리', time: 300 },
  { id: 62, keyword: '루틴 유지', task: '물주기/자리 조정', time: 300 },
  { id: 63, keyword: '비 소리', task: '빗소리 3–5분 듣기', time: 300 },
  { id: 64, keyword: '숲 소리', task: '숲소리 틀고 5분 쉬기', time: 300 },
  { id: 65, keyword: '파도 소리', task: '파도소리 들으며 깊게 호흡 5번', time: 60 },
];

/**
 * id를 키로 하는 할 일 딕셔너리
 * 추후 API 연동 시 대체 예정
 */
export const CAROUSEL_MOCK_DICT: TaskDict = CAROUSEL_MOCK_DATA.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {} as TaskDict);
