// 1. 상품 데이터 (가짜 데이터)
const products = [
    { id: 1, name: "유기농 강아지 사료 2kg", category: "dog", price: 25000, icon: "🐶" },
    { id: 2, name: "캣타워 (대형)", category: "cat", price: 89000, icon: "🐱" },
    { id: 3, name: "강아지 삑삑이 장난감", category: "dog", price: 5000, icon: "🦴" },
    { id: 4, name: "고양이 츄르 (20개입)", category: "cat", price: 12000, icon: "🐟" },
    { id: 5, name: "반려동물 마약 방석", category: "all", price: 32000, icon: "🛏️" },
    { id: 6, name: "강아지 산책용 목줄", category: "dog", price: 15000, icon: "🐕" },
];

// 장바구니 배열
let cart = [];

// DOM 요소 가져오기
const productList = document.getElementById('product-list');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close-btn');
const cartItemsList = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalPriceEl = document.getElementById('total-price');
const filterBtns = document.querySelectorAll('.filter-btn');
const checkoutBtn = document.getElementById('checkout-btn');

// 2. 상품 화면에 그리기 (렌더링)
function renderProducts(filter = 'all') {
    productList.innerHTML = ''; // 초기화

    products.forEach(product => {
        // 필터 조건 확인
        if (filter !== 'all' && product.category !== filter && product.category !== 'all') return;

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img">${product.icon}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>카테고리: ${product.category === 'dog' ? '강아지' : product.category === 'cat' ? '고양이' : '공용'}</p>
                <div class="price">${product.price.toLocaleString()}원</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">장바구니 담기</button>
            </div>
        `;
        productList.appendChild(card);
    });
}

// 3. 장바구니 담기 기능
window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
    alert(`${product.name}이(가) 장바구니에 담겼습니다!`);
};

// 4. 장바구니 삭제 기능
window.removeFromCart = (index) => {
    cart.splice(index, 1); // 해당 인덱스 아이템 삭제
    updateCartUI();
};

// 5. 장바구니 UI 업데이트 (개수, 목록, 총액)
function updateCartUI() {
    // 뱃지 숫자 업데이트
    cartCount.innerText = cart.length;

    // 장바구니 목록 업데이트
    cartItemsList.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p class="empty-msg">장바구니가 비어있습니다.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <span>${item.name}</span>
                <div>
                    <span>${item.price.toLocaleString()}원</span>
                    <button class="remove-btn" onclick="removeFromCart(${index})">삭제</button>
                </div>
            `;
            cartItemsList.appendChild(li);
        });
    }

    // 총액 업데이트
    totalPriceEl.innerText = total.toLocaleString() + '원';
}

// 6. 카테고리 필터링 기능
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // 버튼 스타일 활성화
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        // 필터 적용
        const category = e.target.getAttribute('data-filter');
        renderProducts(category);
    });
});

// 7. 모달 열기/닫기
cartBtn.addEventListener('click', () => cartModal.style.display = 'block');
closeBtn.addEventListener('click', () => cartModal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.style.display = 'none';
});

// 8. 주문하기 (초기화)
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('장바구니가 비어있습니다.');
        return;
    }
    alert(`총 ${totalPriceEl.innerText} 결제가 완료되었습니다!`);
    cart = [];
    updateCartUI();
    cartModal.style.display = 'none';
});

// 초기 실행
renderProducts();