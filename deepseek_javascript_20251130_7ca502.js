// script.js
// 视频数据 - 你需要替换为你自己在GitHub Pages上的视频链接
const videoData = {
    nature: [
        { src: 'https://yourusername.github.io/repo/videos/forest.mp4', title: '森林', thumbnail: 'thumb-forest.jpg' },
        { src: 'https://yourusername.github.io/repo/videos/ocean.mp4', title: '海洋', thumbnail: 'thumb-ocean.jpg' }
    ],
    meditation: [
        { src: 'https://yourusername.github.io/repo/videos/breathing.mp4', title: '呼吸练习', thumbnail: 'thumb-breathing.jpg' },
        { src: 'https://yourusername.github.io/repo/videos/mindfulness.mp4', title: '正念', thumbnail: 'thumb-mindfulness.jpg' }
    ],
    ambient: [
        { src: 'https://yourusername.github.io/repo/videos/rain.mp4', title: '雨声', thumbnail: 'thumb-rain.jpg' },
        { src: 'https://yourusername.github.io/repo/videos/fireplace.mp4', title: '壁炉', thumbnail: 'thumb-fireplace.jpg' }
    ]
};

// 获取DOM元素
const categoryBtns = document.querySelectorAll('.category-btn');
const mainVideo = document.getElementById('mainVideo');
const videoGallery = document.querySelector('.video-gallery');

// 初始化：加载第一个分类的视频
loadCategory('nature');

// 为分类按钮添加点击事件
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 移除其他按钮的active类
        categoryBtns.forEach(b => b.classList.remove('active'));
        // 为当前点击的按钮添加active类
        btn.classList.add('active');
        // 加载对应分类的视频
        loadCategory(btn.dataset.category);
    });
});

function loadCategory(category) {
    const videos = videoData[category];
    videoGallery.innerHTML = ''; // 清空当前图库
    
    videos.forEach(video => {
        const thumbElement = document.createElement('div');
        thumbElement.className = 'video-thumb';
        thumbElement.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}" class="thumbnail">
            <p>${video.title}</p>
        `;
        
        // 点击缩略图时在主播放器播放
        thumbElement.addEventListener('click', () => {
            playVideo(video.src);
        });
        
        videoGallery.appendChild(thumbElement);
    });
    
    // 自动播放第一个视频
    if (videos.length > 0) {
        playVideo(videos[0].src);
    }
}

function playVideo(src) {
    // 为了实现真正的无缝循环，先设置视频源
    mainVideo.src = src;
    
    // 确保循环播放属性已设置 [citation:6]
    mainVideo.loop = true;
    
    // 播放视频
    mainVideo.play().catch(error => {
        console.log('自动播放被阻止，需要用户交互:', error);
    });
}

// 额外添加：监听视频结束事件作为loop属性的后备方案 [citation:3]
mainVideo.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);