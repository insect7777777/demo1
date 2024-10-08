let isFrozen = false; // 商品冻结状态

document.getElementById('buy-button').addEventListener('click', function() {
    if (isFrozen) {
        showNotification('商品已冻结，无法购买');
    } else {
        document.getElementById('purchase-form').classList.remove('hidden');
    }
});

document.getElementById('cancel-button').addEventListener('click', function() {
    document.getElementById('purchase-form').classList.add('hidden');
});

document.getElementById('purchase-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const userName = document.getElementById('user-name').value;
    const userPhone = document.getElementById('user-phone').value;

    // 提交用户信息到卖家后台
    submitPurchaserInfo(userName, userPhone);

    // 隐藏表单
    document.getElementById('purchase-form').classList.add('hidden');
    showNotification('购买成功！感谢您的支持！');
});

function showNotification(message) {
    document.getElementById('notification-message').innerText = message;
    document.getElementById('notification').classList.remove('hidden');
}

function submitPurchaserInfo(name, phone) {
    // 这里可以用 AJAX 或 Fetch API 将数据发送到服务器
    console.log(`用户信息：姓名-${name}，电话-${phone}`);
}

// 模拟从卖家后台获取商品信息
function loadProductInfo() {
    const product = {
        name: "示例商品",
        description: "这是一个示例商品",
        image: "product.jpg",
        price: 100,
        isFrozen: false // 这里模拟商品已被冻结的状态
    };

    document.getElementById('product-name').innerText = product.name;
    document.getElementById('product-description').innerText = product.description;
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-price').innerText = `价格: ¥${product.price}`;

    // 根据商品状态更新页面显示
    if (product.isFrozen) {
        isFrozen = true;
        document.getElementById('buy-button').classList.add('hidden'); // 隐藏购买按钮
        document.getElementById('frozen-message').classList.remove('hidden'); // 显示冻结提示
    } else {
        isFrozen = false;
        document.getElementById('buy-button').classList.remove('hidden'); // 显示购买按钮
        document.getElementById('frozen-message').classList.add('hidden'); // 隐藏冻结提示
    }
}

// 初始化商品信息
loadProductInfo();
