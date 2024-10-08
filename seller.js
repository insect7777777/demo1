const correctUsername = 'cgj';
let correctPassword = '123456'; // 修改为可修改的密码
let currentProduct = null;
let productHistory = [];
let purchasers = [
    { name: '张三', phone: '13812345678' },
    { name: '李四', phone: '13987654321' }
];

let isFrozen = false; // 商品冻结状态


document.getElementById('seller-login').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === correctUsername && password === correctPassword) {
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
    } else {
        alert('用户名或密码错误');
    }
});

// 功能按钮事件
document.getElementById('add-product-button').addEventListener('click', function() {
    if (currentProduct) {
        showModule('current-product');
    } else {
        showModule('product-form');
    }
});

document.getElementById('view-history-button').addEventListener('click', function() {
    showHistory();
});

document.getElementById('view-purchasers-button').addEventListener('click', function() {
    showPurchasers();
});


document.getElementById('change-password-button').addEventListener('click', function() {
    showModule('change-password-form');
});


// 冻结/解冻商品功能
document.getElementById('freeze-product-button').addEventListener('click', function() {
    if (!currentProduct) {
        alert('当前没有商品');
        return;
    }

    if (isFrozen) {
        // 如果商品已被冻结，则执行解冻操作
        unfreezeProduct();
    } else {
        // 如果商品未被冻结，则执行冻结操作
        freezeProduct();
    }
});


// 修改密码表单事件
document.getElementById('password-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;

    if (oldPassword === correctPassword) {
        correctPassword = newPassword;
        alert('密码修改成功');
        showModule('dashboard'); // 返回控制面板
    } else {
        alert('旧密码错误');
    }
});

// 发布商品表单事件
document.getElementById('product-info-form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (currentProduct) {
        alert('请先下架当前商品');
        return;
    }

    const productName = document.getElementById('product-name').value;
    const productDescription = document.getElementById('product-description').value;
    const productImageInput = document.getElementById('product-image');
    const productPrice = document.getElementById('product-price').value;

    const file = productImageInput.files[0];

    // 文件大小限制为10MB
    if (file.size > 10 * 1024 * 1024) {
        alert('图片文件不能超过10MB');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        currentProduct = {
            name: productName,
            description: productDescription,
            image: e.target.result, // 使用文件的URL
            price: productPrice
        };

        productHistory.push(currentProduct);
        updateCurrentProductDisplay();
        showModule('current-product');
    };
    reader.readAsDataURL(file); // 将文件读取为Data URL
});

document.getElementById('remove-product-button').addEventListener('click', function() {
    if (!currentProduct) {
        alert('当前没有商品可以下架');
        return;
    }

    // 确认是否要下架商品
    const confirmRemoval = confirm('确定要下架当前商品吗？');
    if (confirmRemoval) {
        currentProduct = null; // 清除当前商品
        alert('商品已下架');
        showModule('product-form'); // 回到发布商品页面
    }
});

// 查看历史商品
function showHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; // 清空历史列表

    if (productHistory.length === 0) {
        historyList.innerHTML = '<li>没有历史商品</li>';
    } else {
        productHistory.forEach((product, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${product.name}</strong> - ¥${product.price}<br>
                描述: ${product.description}<br>
                <img src="${product.image}" alt="商品图片" style="max-width: 100px;"><br>
                <button class="delete-button" data-index="${index}">删除</button>
            `;
            historyList.appendChild(li);
        });
    }

    showModule('history');
}

// 删除历史商品功能
document.getElementById('history-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
        const index = event.target.getAttribute('data-index');
        productHistory.splice(index, 1);
        alert('商品已成功删除');
        showHistory(); // 重新加载历史商品列表
    }
});

// 查看购买人信息
function showPurchasers() {
    const purchaserList = document.getElementById('purchaser-list');
    purchaserList.innerHTML = '';

    if (purchasers.length === 0) {
        purchaserList.innerHTML = '<li>没有购买人信息</li>';
    } else {
        purchasers.forEach(purchaser => {
            const li = document.createElement('li');
            li.innerText = `姓名: ${purchaser.name}, 电话: ${purchaser.phone}`;
            purchaserList.appendChild(li);
        });
    }

    showModule('purchasers');
}

// 返回按钮事件
document.getElementById('back-to-dashboard').addEventListener('click', function() {
    showModule('dashboard');
});

document.getElementById('back-to-dashboard-purchasers').addEventListener('click', function() {
    showModule('dashboard');
});

document.getElementById('back-to-dashboard-password').addEventListener('click', function() {
    showModule('dashboard');
});

// 显示特定模块的功能
function showModule(moduleId) {
    const modules = ['product-form', 'current-product', 'history', 'purchasers', 'change-password-form'];
    modules.forEach(module => {
        document.getElementById(module).classList.add('hidden');
    });
    document.getElementById(moduleId).classList.remove('hidden');
}

// 冻结商品
function freezeProduct() {
    isFrozen = true;
    alert('商品已冻结');
    updateFreezeButton(); // 更新按钮文本为“解冻商品”
}

// 解冻商品
function unfreezeProduct() {
    isFrozen = false;
    alert('商品已解冻');
    updateFreezeButton(); // 更新按钮文本为“冻结商品”
}

// 更新冻结按钮显示
function updateFreezeButton() {
    const freezeButton = document.getElementById('freeze-product-button');
    if (isFrozen) {
        freezeButton.innerText = '解冻商品'; // 商品已冻结时，显示解冻按钮
    } else {
        freezeButton.innerText = '冻结商品'; // 商品未冻结时，显示冻结按钮
    }
}

// 更新当前商品显示
function updateCurrentProductDisplay() {
    document.getElementById('current-name').innerText = `商品名称: ${currentProduct.name}`;
    document.getElementById('current-description').innerText = `商品描述: ${currentProduct.description}`;
    document.getElementById('current-image').src = currentProduct.image;
    document.getElementById('current-price').innerText = `价格: ¥${currentProduct.price}`;
    isFrozen = false; // 新发布的商品默认为未冻结状态
    updateFreezeButton(); // 重置冻结按钮状态
}
