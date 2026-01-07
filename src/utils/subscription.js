import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.dohyeon5626.com/baekjoon-problem-letter',
});

export const addSubscription = async (subscriptionData) => {
  const { bojId, email, time, count, days } = subscriptionData;

  const payload = {
    userId: bojId,
    email: email,
    sendTime: time,
    problemCount: parseInt(count.replace('개', ''), 10),
    sendDays: days,
  };

  try {
    await apiClient.post('/subscription', payload);
    return { success: true, message: '구독 신청이 완료되었습니다.', data: subscriptionData };
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          return { success: false, message: '유저 아이디를 찾을 수 없습니다. solved.ac와 연동되어 있는지 확인해주세요.' };
        case 409:
          return { success: false, message: '이미 이메일 구독 정보가 존재합니다.' };
        case 429:
          return { success: false, message: '요청이 너무 많습니다. 15분 후 다시 시도해주세요.' };
        default:
          return { success: false, message: `서버 오류가 발생했습니다. (코드: ${error.response.status})` };
      }
    } else if (error.request) {
        return { success: false, message: '서버에 연결할 수 없습니다. 네트워크를 확인해주세요.' };
    }
    return { success: false, message: '요청 중 알 수 없는 오류가 발생했습니다.' };
  }
};

export const cancelSubscription = async (email) => {
  try {
    await apiClient.delete('/subscription', {
      params: { email }
    });
    return { success: true, message: '구독이 정상적으로 해지되었습니다.' };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { success: false, message: '등록된 구독 정보를 찾을 수 없습니다.' };
    }
    return { success: false, message: '구독 해지 중 오류가 발생했습니다.' };
  }
};
