<template>
    <div>
        <section class="container" v-if="cars && cars.length && !loading">
            <article class="card" v-for="car of cars" :key="car.id">
                <CarDescription
                    :name="car.name"
                    :isConvertible="car.convertible"
                    :seats="car.seats"
                />
                <Dropdown label="Trim" :selection="car.trim_levels" />
                <Dropdown label="Extras" :selection="car.extras" />
                <Dropdown label="Paint" :selection="car.paint" />
                <Dropdown label="Wheels" :selection="car.wheels" />
            </article>
        </section>
        <div role="note" class="loading" aria-placeholder="Loading" v-else-if="loading">
            <div role="status" class="loading__ripple">
                <div role="presentation"></div>
                <div role="presentation"></div>
            </div>
        </div>
        <div :aria-errormessage="errorMessage" class="error" v-else-if="errored">
            <p>😞 {{ errorMessage }}!</p>
        </div>
    </div>
</template>

<script>
import Dropdown from './Dropdown.vue';
import CarDescription from './CarDescription.vue';

export default {
    name: 'cars',
    components: {
        Dropdown,
        CarDescription
    },
    data() {
        return {
            cars: [],
            errored: false,
            loading: true,
            errorMessage:
                "We're sorry, we're not able to retrieve this information at the moment, please try again later!"
        };
    },
    mounted() {
        const url = `/api.json`;
        axios
            .get(url)
            .then(response => {
                this.cars = response.data;
            })
            .catch(err => {
                console.error(err);
                this.loading = false;
                this.errored = true;
            })
            .finally(() => (this.loading = false));
    }
};
</script>

<style lang="scss" scoped>
.container {
    margin: 2rem 0 0 0;
}

.error {
    grid-column-start: 1;
    grid-column-end: -1;
    background: #d04228;
    padding: 1rem;
    color: white;
    font-size: 1.5rem;
}

.card {
    display: flex;
    flex-flow: column;
    border: 1px solid #e1e1e18c;
    box-shadow: 2px 2px 8px 0 lightgrey;
    border-radius: 2px;
    padding: 2rem;
    font-size: 1.3rem;

    &:hover {
        transition: all 0.4s ease;
        transform: translate(0, -10px);
        box-shadow: 4px 8px 12px 0 lightgrey;
    }
    img {
        max-width: 100%;
        display: block;
    }
    h1 {
        font-size: 1.5rem;
        margin: 1rem 0 1rem 0;
    }

    img {
        order: -1;
        align-self: center;
    }
}
.loading {
    display: grid;
    align-items: center;
    justify-content: center;
    height: 400px;
    overflow: none;
}
.loading__ripple {
    display: block;
    position: relative;
    width: 144px;
    height: 144px;
}
.loading__ripple div {
    position: absolute;
    border: 4px solid red;
    opacity: 1;
    border-radius: 50%;
    animation: ripple 1.3s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.loading__ripple div:nth-child(2) {
    animation-delay: -0.5s;
}
@keyframes ripple {
    0% {
        top: 74px;
        left: 74px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        top: -1px;
        left: -1px;
        width: 144px;
        height: 144px;
        opacity: 0;
    }
}
</style>
