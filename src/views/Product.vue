<template>
    <div class="main-container">
        <div class="product-top-container" v-show="product !== null">
            <div class="product-feature">
                <img 
                    :style="{width: '300px'}"
                    :src="'/imgs' + product.feature_img" 
                    :aria-label="product.name"/>
            </div>
            <div class="product-purchase">
                <h1>{{product.name}}</h1>
                <div>
                    <p>${{product.price}}.00</p>
                </div>
                <div class="product-select-container">
                    <MiniMenu 
                        label="color" 
                        :selectionLabel="selectedItem['color']"
                        :leftBorderOn="false"
                        @toggleMenu="handleMenu($event)" 
                        :otherOpen="'color' !== currentMenuType"/>
                    <MiniMenu 
                        label="size" 
                        :selectionLabel="selectedItem['size']"
                        :leftBorderOn="true"
                        @toggleMenu="handleMenu($event)" 
                        :otherOpen="'size' !== currentMenuType"/>
                </div>
                <div 
                    v-show="openMenu"
                    class="mini-menu">
                    <div 
                        v-for="item in menuItems"
                        :key="item"
                        class="mini-menu-item"
                        @click="selectItem(item)"
                        :style="{
                            width: currentMenuType === 'size' ? '50px' : 'auto',
                            border: selectedItem[currentMenuType]  === item ? '2px solid #333' : '2px solid #FFF' }">
                            <span 
                                v-if="currentMenuType === 'size'"
                                >{{item}}</span>
                            <span 
                                v-else
                                :style="{
                                    display: 'block',
                                    width: '25px',
                                    height: '25px',
                                    background: item}"></span>
                        </div>
                </div>
                <div>
                    <p>Free Shipping and Returns
                        Place your order today and receive it within 3-5 working days    
                        <a>Find Out</a> more or <a>Contact Us</a></p>
                </div>
                <div class="product-interactive">
                    <button 
                        style="color: white; background: black;"
                        class="shop-btn block-btn"
                        @click="addToBag()">Add to Bag</button>
                    <font-awesome-icon 
                        @click="toggleHeart()"
                        size="2x"
                        style="margin: 0px 10px; cursor: pointer;"
                        :icon="[heartFull ? 'fas' : 'far', 'heart']"/>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import MiniMenu from '../components/inputs/MiniMenu.vue';
export default {
    name: 'product',
    components: {
        MiniMenu,
    },
    data() {
        return {
            currentMenuType: '',
            heartFull: false,
            products: [],
            product: { colors: [], sizes: [] },
            openMenu: false,
            menuItems: [],
            selectedItem: {
                color: '-',
                size: '-',
            },
        };
    },
    mounted() {
        this.getProduct(this.$route.params.id);
    },
    methods: {
        async getProduct(id) {
            try {
                const url = 'http://localhost:8080/products.json';
                const response = await fetch(url);
                const data = await response.json();
                this.products = Object.values(data).reduce(
                    (prevVal, currentVal) => prevVal.concat(currentVal), []);
                this.product = this.products.find((product) => product.id === id);
                this.selectedItem = { color: this.product.colors[0], size: this.product.sizes[0] };
            } catch (err) {
                console.log(err);
            }
        },
        addToBag() {
            console.log('add to bag');
            const { feature_img, id, price } = this.product;
            const { size, color } = this.selectedItem;
            const item = {
                product_img: feature_img,
                id,
                size,
                color,
                price,
                quantity: 1,
            };
            this.$store.commit({ type: 'addToCart', item });
        },
        toggleHeart() {
            this.heartFull = !this.heartFull;
        },
        handleMenu(data) {
            const { open, menuType } = data;
            this.openMenu = open;
            if (open) {
                this.currentMenuType = menuType;
                this.menuItems = this.product[menuType + 's'];
            }
        },
        selectItem(item) {
            this.selectedItem = {...this.selectedItem, [this.currentMenuType]: item};
        },
    },
    watch: {
        async $route(to, from) {
            if (this.products.length === 0) {
                this.getProduct();
            } else {
                this.product = this.products.find((product) => product.id === to.params.id);
                this.selectedItem = { color: this.product.colors[0], size: this.product.sizes[0] };
            }
        },
    },
};
</script>

<style scoped>
.product-feature {
    position: relative;
    overflow: hidden;
    width: 300px;
    height: 450px;
}

.product-select-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    cursor: pointer;
}

.product-top-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
}
.product-purchase {
    width: 400px;
    min-width: 250px;
    padding: 25px;
}

.product-interactive {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.block-btn {
    padding: 15px 25px;
    font-size: 1em;
    font-weight: bold;
    width: 80%;
}

.mini-menu {
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    font-size: 1.2em;
    text-transform: uppercase;
    font-weight: 400;
}

.mini-menu-item {
    text-align: center;
    margin: 5px; 
    padding: 5px;
    border: 2px solid #FFF;
    opacity: 1;
    transition: border 1s, opacity 1s;
}

.mini-menu-item:hover {
    border: 2px solid #333;
    opacity: 0.6;
    cursor: pointer;
}
</style>