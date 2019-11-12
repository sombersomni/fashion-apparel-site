<template>
    <div>
        <transition name="fade">
            <div 
                @click="closeModal()"
                v-show="open"
                style="position: absolute; left: 0; top: 0">
                <div class="modal-bg"></div>
            </div>
        </transition>
        <transition name="modal-show">
            <div 
                style="width: 80%;"
                v-show="open"
                class="modal">
                <font-awesome-icon 
                    @click="closeModal()"
                    class="close-btn"
                    :icon="['far', 'times']" />
                <h3>CAN WE HELP?</h3>
                <h4>Telephone</h4>
                <p>Our company offers global assistance 24-hours a day, seven days a week. 
                Kindly note, we may monitor or record your communications for training and quality control. 
                <br />
                +1 877 217 4085 </p>
                <h4>Email</h4>
                <a>us.customerservice@apparel.com</a>
                <h4>Instagram</h4>
                <a>@SomberSomniArt</a>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    props: {
        open: {
            type: Boolean,
            required: true,
        },
    },
})
export default class ContactModal extends Vue {
    public open: boolean = false;
    public closeModal() {
        this.$emit('onCloseModal', false);
    }
}
</script>

<style scoped>
.close-btn {
    position: absolute;
    right: 25px;
    top: 25px;
    opacity: 1;
    transition: opacity 1s;
}

.close-btn:hover {
    cursor: pointer;
    opacity: 0.6
}
/* animations */
.modal-show-enter-active, .modal-show-leave-active {
    transition: 1s;
}

.modal-show-enter-to, .modal-show-leave {
    opacity: 1;
    transform: translate(-50%, -50%);
}

.modal-show-enter, .modal-show-leave-to {
    opacity: 0;
    transform: translate(-50%, 300px);
}
</style>