import mongoose from 'mongoose';
import Artist from './models/Artist';
import User from './models/User';

const seedArtists = async () => {
  try {
    console.log('🌱 시드 데이터 추가 시작...');
    
    // MongoDB 연결
    await mongoose.connect('mongodb://localhost:27018/ask-the-stars');
    console.log('✅ MongoDB 연결 성공');
    
    // 기존 데이터 삭제
    console.log('🗑️ 기존 데이터 삭제 중...');
    await Artist.deleteMany({});
    await User.deleteMany({});
    console.log('✅ 기존 데이터 삭제 완료');

    // 테스트 사용자 생성
    console.log('👤 테스트 사용자 생성 중...');
    const testUser = new User({
      name: '테스트 사용자',
      email: 'test@example.com',
      password: 'password123',
      type: 'artist'
    });
    await testUser.save();
    console.log('✅ 테스트 사용자 생성 완료');

    // 목업 아티스트 데이터
    const artists = [
      {
        name: '김바이올린',
        category: 'music',
        subcategory: 'classical',
        profileImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face',
        coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=300&fit=crop',
        description: '클래식 바이올린 연주자. 길거리에서 클래식의 아름다움을 전파합니다.',
        location: '홍대입구역 2번 출구',
        schedule: '매주 토요일 오후 2-6시',
        followers: 1250,
        subscriptionPrice: 50000,
        videos: [
          {
            title: '바하 무반주 바이올린 소나타',
            thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
            url: '#',
            duration: '4:32',
            views: 15420,
            uploadDate: new Date('2024-01-15')
          }
        ],
        goods: [
          {
            name: '수제 바이올린 손목띠',
            price: 10000,
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
            description: '김바이올린이 직접 제작한 수제 손목띠입니다.',
            stock: 20
          }
        ],
        userId: testUser._id
      },
      {
        name: '춤추는별',
        category: 'dance',
        subcategory: 'kpop_dance',
        profileImage: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=400&fit=crop&crop=face',
        coverImage: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=300&fit=crop',
        description: 'K-POP 댄스 커버 전문가. 역동적인 무대와 완벽한 안무로 관객을 사로잡습니다.',
        location: '강남역 11번 출구',
        schedule: '매주 일요일 오후 3-7시',
        followers: 3200,
        subscriptionPrice: 30000,
        videos: [
          {
            title: 'NewJeans - Get Up 안무 커버',
            thumbnail: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=200&fit=crop',
            url: '#',
            duration: '3:15',
            views: 45600,
            uploadDate: new Date('2024-01-20')
          }
        ],
        goods: [
          {
            name: '댄스 워크샵 티켓',
            price: 25000,
            image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=200&h=200&fit=crop',
            description: '1:1 댄스 레슨 티켓입니다.',
            stock: 10
          }
        ],
        userId: testUser._id
      },
      {
        name: '길거리화가',
        category: 'art',
        subcategory: 'portrait',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=300&fit=crop',
        description: '순간의 아름다움을 캔버스에 담는 포트레이트 아티스트. 길거리에서 만나는 사람들의 특별한 순간을 그림으로 기록합니다.',
        location: '명동역 6번 출구',
        schedule: '평일 오후 1-5시',
        followers: 890,
        subscriptionPrice: 40000,
        videos: [
          {
            title: '5분 초상화 그리기',
            thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
            url: '#',
            duration: '5:20',
            views: 12300,
            uploadDate: new Date('2024-01-18')
          }
        ],
        goods: [
          {
            name: '수채화 초상화',
            price: 50000,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
            description: 'A4 사이즈 수채화 초상화입니다.',
            stock: 5
          }
        ],
        userId: testUser._id
      },
      {
        name: '국악소리',
        category: 'music',
        subcategory: 'korean_traditional',
        profileImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&crop=face',
        coverImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=300&fit=crop',
        description: '전통 국악의 아름다움을 현대적으로 재해석하는 가야금 연주자.',
        location: '인사동길',
        schedule: '매주 금요일 오후 4-8시',
        followers: 2100,
        subscriptionPrice: 60000,
        videos: [
          {
            title: '아리랑 가야금 연주',
            thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&h=200&fit=crop',
            url: '#',
            duration: '6:45',
            views: 28900,
            uploadDate: new Date('2024-01-22')
          }
        ],
        goods: [
          {
            name: '전통 문양 스티커',
            price: 5000,
            image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=200&h=200&fit=crop',
            description: '한국 전통 문양이 들어간 스티커 세트입니다.',
            stock: 50
          }
        ],
        userId: testUser._id
      }
    ];

    // 아티스트 데이터 삽입
    console.log('🎨 아티스트 데이터 추가 중...');
    for (const artistData of artists) {
      const artist = new Artist(artistData);
      await artist.save();
      console.log(`✅ ${artistData.name} 추가 완료`);
    }

    console.log('✅ 목업 데이터가 성공적으로 추가되었습니다!');
    console.log(`📊 총 ${artists.length}명의 아티스트가 추가되었습니다.`);
    
    // 연결 종료
    await mongoose.disconnect();
    console.log('🔌 MongoDB 연결 종료');
    
  } catch (error) {
    console.error('❌ 데이터 시딩 중 오류 발생:', error);
  }
};

export default seedArtists;
