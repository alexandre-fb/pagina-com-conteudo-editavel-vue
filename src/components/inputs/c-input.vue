<template>
    <div class="input-item" :style="{ padding: productItem ? '35px 15px' : '35px'}">
        
        <label :for="for_id" class="input-item__label" v-if="label">{{label}}</label>

        <textarea v-if="type === 'textArea'"
            :rows="rows ? rows : 7"  
            :id="for_id"  
            class="input-item__input" 
            v-model="componentValue" 
            @input="emit"
        />
                                
        <input v-else
            :type="type" 
            :id="for_id" 
            :class="type === 'color' ? 'input-item__input-color' : 'input-item__input'" 
            v-model="componentValue"
            @input="emit"
        >

        <p v-if="description" class="input-item__description" >{{description}}</p>
    </div>
</template>

<script>
export default {
    name: 'CInputText',
    props: {
        value: [String, Number],
        label: String,
        for_id: [String, Number],
        description: String,
        type: String,
        rows: Number,
        productItem: Boolean 
    },
    data() {
        return {
            componentValue: this.value,
        }
    },
    methods: {
        emit() {
            this.$emit('update:value', this.componentValue)
        }
    }
}
</script>

<style lang="scss" scoped>
.input-item {
    display: flex;
    flex-direction: column;
    border-top: 1px solid rgb(240, 240, 240);
    border-bottom: 1px solid rgb(240, 240, 240);
    transition: 300ms ease;

    &:hover {
        border-top: 1px solid rgb(144, 144, 144);
        border-bottom: 1px solid rgb(144, 144, 144);
        background-color: rgb(238, 238, 238);
    }

    .input-item__label {
        font-weight: 500;
        width: 100%;
    }
    
    .input-item__input-color {
        cursor: pointer;
        margin-top: 10px;
    }
    
    .input-item__input {
        border: none;
        padding: 10px;
        margin-top: 10px;
        color: #777;
        border: 1px solid rgb(177, 177, 177);
        width: 100%;
        font-family: inherit;
        font-size: 14px;
    }

    .input-item__description {
        margin: 5px;
        font-size: 14px;
        font-style: italic;
    }
}
</style>