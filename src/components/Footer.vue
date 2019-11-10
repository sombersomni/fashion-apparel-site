<template>
    <footer>
        <form 
            class="footer-section"
            @submit="onSubmitEmail($event)">
            <h4>EMAIL SIGN-UP</h4>
            <p>Sign up for email updates on the latest collections, campaigns and videos.</p>
            <label for="email">Email*</label>
            <div>
                <input ref="inputRef" type="text" name="email" id="email" placeholder="Enter in your email address"/>
                <button type="submit" aria-label="Submit">
                    <font-awesome-icon 
                    size="2x"
                    :icon="['fal', 'arrow-right']" />
                </button>
            </div>
        </form>
        <section class="footer-section">
            <h4>Follow Us</h4>
            <div class="underline"></div>
            <div>
                <font-awesome-icon 
                    :style="iconStyle"
                    size="2x"
                    :icon="['fab', 'twitter']" />
                <font-awesome-icon 
                    :style="iconStyle"
                    size="2x"
                    :icon="['fab', 'instagram']" />
            </div>
        </section>
        <div 
            class="footer-section">
            <h4 style="margin-bottom: 25px;">Disclaimer</h4>
            <div class="underline"></div>
            <p>This is not a real store. This is a demo site for portfolio purposes.
                This site was created using Vue 
                <font-awesome-icon 
                size="2x"
                style="color: green;"
                :icon="['fab', 'vuejs']" />
                <br>
                ©️ Somber Somni 2019
            </p>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            iconStyle: {
                marginRight: '10px',
                marginTop: '10px',
            },
        };
    },
    methods: {
        onSubmitEmail(e) {
            e.preventDefault();
            this.$refs.inputRef.value = '';
        },
    },
};
</script>

<style scoped>
    footer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100vw;
        background: #333;
        color: white;
        margin: 0;
        padding: 25px 0px;
    }
    
    .footer-section {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-content: flex-start;
        width: 30vw;
        min-width: 280px;
        width: 300px;
        margin: 0px 10px;
        padding: 10px;
        text-align: left;
    }

    h4,h3 {
        margin: 0;
    }

    input[type='text'] {
        height: 20px;
        border: 2px solid white;
        background: transparent;
        padding: 10px;
        width: 80%;
        color: white;
    }

    button[type='submit'] {
        width: 20%;
        padding: 5px 25px;
        background: white;
        border: none;
        cursor: pointer;
        font-weight: bold;
    }

    form > div {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;

    }

    section > div {
        display: flex;
        flex-direction: row;
    }

    footer > section > h4 {
        margin-bottom: 25px;
    }
    
</style>