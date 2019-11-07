<template>
    <div class="main-container">
        <ContactModal 
            :open="modalOpen"
            @onCloseModal="modalOpen = $event" />
        <font-awesome-icon
            v-show="allowZoom"
            :style="{top: mouseY, left: mouseX}"
            class="zoom-mouse" 
            size="2x"
            :icon="['fal', 'plus-circle']"/>
        <div class="product-top-container" v-show="product !== null">
            <div class="product-feature-container">
                <div 
                    class="product-pics-container"
                    :style="{
                        flexDirection: $store.state.currentWidth < 1000 ? 'row' : 'column',
                        marginTop: $store.state.currentWidth < 1000 ? '5px' : '0px',
                        marginRight: $store.state.currentWidth < 1000 ? '0px' : '10px',
                        }">
                    <div
                        v-for="img in product.imgs"
                        :key="img"
                        :style="{
                            marginBottom: $store.state.currentWidth < 1000 ? '0px' : '10px',
                            marginRight: $store.state.currentWidth < 1000 ? '10px' : '0px',
                            }"
                        @click="onImageSelect(img)"
                        class="product-pic">
                        <img :src="'/imgs' + img" />
                    </div>
                </div>
                <div 
                    @mousemove="zoomImage($event)"
                    @mouseenter="zoomIn()"
                    @mouseleave="zoomOut()"
                    class="product-feature">
                    <div class="feature-cover"></div>
                    <img 
                        :style="{
                            width: allowZoom ? 'auto' : '100%',
                            transform: `translate(${mainImgX+'px'}, ${mainImgY+'px'})`
                            }"
                        :src="'/imgs' + (selectedImage.length > 0 ? selectedImage : '')" 
                        :aria-label="product ? product.name : 'none'"/>
                </div>
            </div>
            <div 
                :style="{maxWidth: $store.state.currentWidth < 875 ? '80%' : '35vw'}"
                class="product-purchase">
                <h1 style="text-transform: capitalize;">{{product ? product.name : ''}}</h1>
                <div>
                    <p>${{product ? product.price : 0}}.00</p>
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
                <transition name="open-menu">
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
                </transition>
                <div>
                    <p style="text-align: left;">Free Shipping and Returns
                        Place your order today and receive it within 3-5 working days    
                        <a @click="openModal()">Contact Us</a></p>
                </div>
                <div class="product-interactive">
                    <button 
                    
                        style="color: white; background: black;"
                        class="shop-btn block-btn product-interactive-item"
                        @click="addToBag()">Add to Bag</button>
                    <font-awesome-icon 
                        @click="toggleHeart()"
                        size="2x"
                        class="product-interactive-item"
                        style="margin: 0px 10px; cursor: pointer;"
                        :icon="[heartFull ? 'fas' : 'far', 'heart']"/>
                </div>
                <div 
                    v-show="product.details && product.details.length > 0"
                    class="product-details">
                    <h4>Details</h4>
                    <p>{{product.details}}</p>
                    <h4>Fabrics</h4>
                    <p>
                        <span
                            v-for="(fabric, i) in product.fabrics"
                            :key="fabric"
                            >{{fabric}} 
                            <span v-show="i !== product.fabrics.length - 1"> | </span>
                        </span>
                    </p>
                    <h4>Care Instructions</h4>
                    <p>{{product['washer-details']}}</p>
                    <div>
                        <font-awesome-icon 
                            class="care-icons"
                            size="1x"
                            :icon="['far', 'exclamation-triangle']"/>
                        <font-awesome-icon 
                            class="care-icons"
                            size="1x"
                            :icon="['far', 'washer']"/>
                        <font-awesome-icon 
                            class="care-icons"
                            size="1x"
                            :icon="['far', 'tint-slash']"/>
                        <font-awesome-icon 
                            class="care-icons"
                            size="1x"
                            :icon="['far', 'dryer']"/>    
                    </div>
                </div>
            </div>
        </div>
        <div class="info-module-container">
            <div class="info-module">
                <font-awesome-icon size="2x" :icon="['far', 'truck']" />
                <h4>Free Standard Shipping</h4>
                <p>Place your order today and receive it within 3-5 working days</p>
            </div>
            <div class="info-module">
                <font-awesome-icon size="2x" :icon="['far', 'bags-shopping']" />
                <h4>Collect-in-Store</h4>
                <p>Order online today and pick up your items in store as early as tomorrow</p>
            </div>
            <div class="info-module">
                <font-awesome-icon size="2x" :icon="['far', 'truck']" />
                <h4>Free Gift Packaging</h4>
                <p>Our gift packaging includes a signature gift box finished with a hand-tied ribbon</p>
            </div>
        </div>
    </div>

</template>

<script>
import MiniMenu from '../components/inputs/MiniMenu.vue';
import ContactModal from '../components/modals/ContactModal.vue';
export default {
    name: 'product',
    components: {
        MiniMenu,
        ContactModal,
    },
    data() {
        return {
            allowZoom: false,
            currentMenuType: '',
            heartFull: false,
            products: [],
            product: { colors: [], sizes: [], feature_img: '' },
            openMenu: false,
            menuItems: [],
            selectedItem: {
                color: '-',
                size: '-',
            },
            selectedImage: '',
            mainImgX: 0,
            mainImgY: 0,
            mouseX: 0,
            mouseY: 0,
            modalOpen: false,
        };
    },
    mounted() {
        this.getProduct(this.$route.params.id);
    },
    methods: {
        async getProduct(id) {
            try {
                const url = '/products.json';
                const response = await fetch(url);
                const data = await response.json();
                this.products = Object.values(data).reduce(
                    (prevVal, currentVal) => prevVal.concat(currentVal), []);
                this.product = this.products.find((product) => product.id === id);
                if (this.product) {
                    this.selectedItem = { color: this.product.colors[0], size: this.product.sizes[0] };
                    this.selectedImage = this.product.feature_img;
                }
            } catch (err) {
                console.log(err);
            }
        },
        addToBag() {
            const { feature_img, id, price, name } = this.product;
            const { size, color } = this.selectedItem;
            const item = {
                product_img: feature_img,
                id,
                name,
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
        onImageSelect(img) {
            this.selectedImage = img;
        },
        selectItem(item) {
            this.selectedItem = {...this.selectedItem, [this.currentMenuType]: item};
        },
        zoomImage(e) {
            const frameWidth = e.srcElement.clientWidth;
            const frameHeight = e.srcElement.clientHeight;
            const imgWidth = e.srcElement.nextElementSibling ? e.srcElement.nextElementSibling.naturalWidth : 1920;
            const imgHeight = e.srcElement.nextElementSibling ? e.srcElement.nextElementSibling.naturalHeight : 1080;
            const mouseX = e.offsetX;
            const mouseY = e.offsetY;
            const newWidth = imgWidth - frameWidth;
            const newHeight = imgHeight - frameHeight;
            const xSteps = newWidth / frameWidth;
            const ySteps = newHeight / frameHeight;
            this.mainImgX = mouseX * xSteps * -1;
            this.mainImgY = mouseY * ySteps * -1;
            this.mouseX = e.x - 40;
            this.mouseY = e.y + 40;
        },
        zoomIn() {
            this.allowZoom = true;
            this.mainImgX = 0;
            this.mainImgY = 0;
        },
        zoomOut() {
            this.allowZoom = false;
            this.mainImgX = 0;
            this.mainImgY = 0;
        },
        openModal() {
            this.modalOpen = true;
        },
    },
    watch: {
        async $route(to, from) {
            if (to.name === 'women-product' || to.name === 'men-product') {
                window.scrollTo(0, 0);
                this.currentMenuType = '';
                this.openMenu = false;
                if (this.products.length === 0) {
                    this.getProduct();
                } else {
                    this.product = this.products.find((product) => product.id === to.params.id);
                    this.selectedItem = { color: this.product.colors[0], size: this.product.sizes[0] };
                    this.selectedImage = this.product.feature_img;
                }
            }
        },
    },
};
</script>

<style scoped>
.care-icons {
    margin: 5px;
}

.info-module-container {
    width: 100vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    margin-top: 25px;
}

.info-module {
    min-width: 280px;
    width: 300px;
    margin: 0px 25px;
    padding: 10px;
}

.info-module > p {
    padding: 0px 20px;
}

.zoom-mouse {
    position: absolute;
    z-index: 90;
}
.product-feature {
    position: relative;
    overflow: hidden;
    max-width: 400px;
    min-width: 300px;
    max-height: 600px;  
    min-height: 450px;
    cursor: none;
}
.product-feature-container {
    display: flex;
    flex-wrap: wrap-reverse;
    max-width: 50vw;
    min-width: 300px;
    margin: 0px 25px;
    min-height: 450px;

}
.product-select-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    cursor: pointer;
    background: white;
    z-index: 2;
}

.product-top-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    width: 100vw;
}
.product-purchase {
    min-width: 200px;
    padding: 25px;
    margin: 0px 0px 25px 0px;
    transition: width 1s;
}
.product-pics-container {
    display: flex;
    justify-content: flex-start;
}
.product-pic {
    width: 100px;
    height: 100px;
    overflow: hidden;
    opacity: 1;
    transition: opacity 1s;
}

.product-pic:hover {
    opacity: 0.75;
    cursor: pointer;
}

.product-pic > img {
    width: 100%;
}

.product-interactive {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.product-interactive-item {
    flex-grow: 1;
}

.product-details {
    width: 90%;
    padding: 25px;
    height: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: center;
    background: #DDD;
    margin-top: 10px;
    text-align: left;
}

.product-details > h4,h5,h6 {
    margin: 2px 0px;
}

.mini-menu {
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    font-size: 1.2em;
    text-transform: uppercase;
    font-weight: 400;
    height: 45px;
    z-index: 0;
    overflow-y: hidden;
}

.mini-menu-item {
    text-align: center;
    margin: 5px; 
    padding: 5px;
    border: 2px solid #FFF;
    opacity: 1;
    transition: border 0.5s, opacity 0.5s;
}

.mini-menu-item:hover {
    border: 2px solid #333;
    opacity: 0.6;
    cursor: pointer;
}

.feature-cover {
    position: absolute;
    background: #333;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
}

a {
    text-decoration: underline;
    color:rebeccapurple;
    cursor: pointer;
}

h1 {
    margin: 0;
}

/* animation */
.open-menu-enter-active, .open-menu-leave-active {
    transition: 1s;
}
.open-menu-enter, .open-menu-leave-to {
    opacity: 0;
    height: 0px;
}
.open-menu-enter-to, .open-menu-leave {
    opacity: 1;
    height: 45px;
}
</style>