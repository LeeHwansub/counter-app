class CounterApp {
    constructor() {
        this.apiUrl = 'http://localhost:3000/api';
        this.counterElement = document.getElementById('counter');
        this.incrementBtn = document.getElementById('incrementBtn');
        this.decrementBtn = document.getElementById('decrementBtn');
        this.statusElement = document.getElementById('status');
        
        this.init();
    }
    
    init() {
        this.loadCounter();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.incrementBtn.addEventListener('click', () => this.increment());
        this.decrementBtn.addEventListener('click', () => this.decrement());
    }
    
    async loadCounter() {
        try {
            this.showStatus('카운터 로딩 중...');
            const response = await fetch(`${this.apiUrl}/counter`);
            const data = await response.json();
            this.updateDisplay(data.count);
            this.showStatus('카운터 로드 완료');
        } catch (error) {
            console.error('카운터 로드 오류:', error);
            this.showStatus('카운터 로드 실패', 'error');
        }
    }
    
    async increment() {
        try {
            this.setLoading(true);
            this.showStatus('증가 중...');
            
            const response = await fetch(`${this.apiUrl}/counter/increment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json();
            this.updateDisplay(data.count);
            this.showStatus('증가 완료!');
        } catch (error) {
            console.error('증가 오류:', error);
            this.showStatus('증가 실패', 'error');
        } finally {
            this.setLoading(false);
        }
    }
    
    async decrement() {
        try {
            this.setLoading(true);
            this.showStatus('감소 중...');
            
            const response = await fetch(`${this.apiUrl}/counter/decrement`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json();
            this.updateDisplay(data.count);
            this.showStatus('감소 완료!');
        } catch (error) {
            console.error('감소 오류:', error);
            this.showStatus('감소 실패', 'error');
        } finally {
            this.setLoading(false);
        }
    }
    
    updateDisplay(count) {
        this.counterElement.textContent = count;
    }
    
    setLoading(loading) {
        if (loading) {
            this.incrementBtn.classList.add('loading');
            this.decrementBtn.classList.add('loading');
        } else {
            this.incrementBtn.classList.remove('loading');
            this.decrementBtn.classList.remove('loading');
        }
    }
    
    showStatus(message, type = 'info') {
        this.statusElement.textContent = message;
        this.statusElement.className = `status ${type}`;
        
        // 3초 후 상태 메시지 제거
        setTimeout(() => {
            if (this.statusElement.textContent === message) {
                this.statusElement.textContent = '';
            }
        }, 3000);
    }
}

// 앱 시작
document.addEventListener('DOMContentLoaded', () => {
    new CounterApp();
}); 