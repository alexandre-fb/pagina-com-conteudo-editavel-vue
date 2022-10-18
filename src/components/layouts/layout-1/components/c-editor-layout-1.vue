<template>
    <div>
        <transition name="fade" mode="out-in">
        
            <div class="editor-area__section editor-area__empty" v-if="selectedSectionToEdit === ''" key="empty">
                <p class="section__title">Selecione a seção que deseja editar.</p>
            </div>

            <div class="editor-area__section editor-area__section--colors" v-else-if="selectedSectionToEdit === 'colors'" key="colors-section">
                <h3 class="section__title">Cores</h3>
                <div class="section__inputs-container">

                    <CInput 
                        :type="'color'" 
                        :label="'Cor primária:'"
                        :for_id="'primary-color'"
                        :value.sync="componentData.primaryColor"
                    />

                        <CInput 
                            :type="'color'" 
                            :label="'Cor secundária:'"
                            :for_id="'secondary-color'"
                            :value.sync="componentData.secondaryColor"
                        />

                        <CInput 
                            :type="'color'" 
                            :label="'Cor terciária:'"
                            :for_id="'terciary-color'"
                            :value.sync="componentData.tertiaryColor"
                        />
                    </div>

                </div>

                <div class="editor-area__section editor-area__section--banner" v-else-if="selectedSectionToEdit === 'bannerSection'" key="banner-section">
                    <h3 class="section__title">Imagem destaque</h3>
                    <div class="section__inputs-container">

                    <CInput 
                        :type="'url'" 
                        :label="'Imagem:'"
                        :for_id="'banner-image'"
                        :description="'Insira o link da imagem no campo acima.'"
                        :value.sync="componentData.bannerSection.image.url"
                    />
                    <CInput 
                        :type="'url'" 
                        :label="'Texto alternativo:'"
                        :for_id="'banner-image-alt'"
                        :description="'*Breve descrição da imagem. Esse texto seráexibidose a imagem não puder ser exibida.'"
                        :value.sync="componentData.bannerSection.image.alt"
                    />
                </div>
            </div>
                            
            <div class="editor-area__section editor-area__section--description" v-else-if="selectedSectionToEdit === 'descriptionSection'" key="description-section">
                <h3 class="section__title">Descrição</h3>
                <div class="section__inputs-container">
                
                    <CInput 
                        :type="'text'" 
                        :label="'Título:'"
                        :for_id="'description-title'"
                        :value.sync="componentData.descriptionSection.title"
                    />
                    <CInput 
                        :type="'textArea'" 
                        :label="'Texto:'"
                        :for_id="'description-text'"
                        :value.sync="componentData.descriptionSection.paragraph"
                    />
                    <CInput 
                        :type="'text'" 
                        :label="'Texto do botão:'"
                        :for_id="'description-button-text'"
                        :value.sync="componentData.descriptionSection.button.text"
                    />
                    <CInput 
                        :type="'url'" 
                        :label="'Link do botão:'"
                        :for_id="'description-button-link'"
                        :value.sync="componentData.descriptionSection.button.link"
                    />
                </div>
            </div>
            
             
              <div class="editor-area__section editor-area__section--description" v-else-if="selectedSectionToEdit === 'productsListSection'" key="products-list">
                   
                <h3 class="section__title">Lista de produtos</h3>
                <div class="section__inputs-container">

                    <CInput 
                        :type="'text'" 
                        :label="'Título:'"
                        :for_id="'products-list-title'"
                        :value.sync="componentData.productsListSection.title"
                    />
                            
                    <div class="input-item" v-for="product in componentData.productsListSection.productsList" :key="product.id">
                        <div class="collapse-title" :id="product.id" @click="openProductItemInputs">
                            <h4 :id="product.id" class="product-item__title">{{`Produto ${product.id}`}}</h4>
                            <ExpandIcon :id="product.id" :class="componentData.productsListSection.productsList[product.id - 1].isOpen ? 'isOpen' : 'isClosed'" />
                        </div>
                        <transition name="expand">
                            <div class="collapse-content" v-show="componentData.productsListSection.productsList[product.id - 1].isOpen">

                                <CInput 
                                    :type="'url'" 
                                    :label="'Imagem:'"
                                    :for_id="'product-item-image'"
                                    :productItem="true"
                                    :description="'Insira o link da imagem no campo acima.'"
                                    :value.sync="componentData.productsListSection.productsList[product.id - 1].image.url"
                                />

                                <CInput 
                                    :type="'text'" 
                                    :label="'Nome:'"
                                    :for_id="'input-text-products-list-name'"
                                    :productItem="true"
                                    :value.sync="componentData.productsListSection.productsList[product.id - 1].productData.name"
                                />

                                <CInput 
                                    :type="'text'" 
                                    :label="'Código:'"
                                    :for_id="'input-text-products-list-code'"
                                    :productItem="true"
                                    :value.sync="componentData.productsListSection.productsList[product.id - 1].productData.code"
                                />

                                <CInput 
                                    :type="'textArea'" 
                                    :label="'Descrição:'"
                                    :for_id="'input-text-products-list-description'"
                                    :rows="4"
                                    :productItem="true"
                                    :value.sync="componentData.productsListSection.productsList[product.id - 1].productData.description"
                                />

                                <CInput 
                                    :type="'url'" 
                                    :label="'Link:'"
                                    :for_id="'input-text-products-list-link'"
                                    :productItem="true"
                                    :value.sync="componentData.productsListSection.productsList[product.id - 1].productData.link.url"
                                />

                            </div>
                        </transition>
                    </div>
                    <div class="products-buttons-container">
                        <button 
                            class="button-default add-product-button" 
                            @click="addProduct" 
                            v-if="componentData.productsListSection.productsList.length < 5">
                            Novo produto
                        </button>
                        <button 
                            class="button-default remove-product-button" 
                            @click="removeProduct" 
                            v-if="componentData.productsListSection.productsList.length > 1">
                            Remover
                        </button>
                    </div>
                </div>
            </div>      
        </transition>
    </div>
</template>

<script>
import ExpandIcon from '../../../icons/expand-icon.vue'
import CInput from '../../../inputs/c-input.vue'

export default {
    name: 'CEditorLayout1',
    components: { ExpandIcon, CInput },
    props: {
        selectedSectionToEdit: String,
        data: Object
    },
    data() {
        return {
            html: null,
            componentData: this.data,
        }    
    },
    watch: {
        componentData() {
            this.$emitData()
        }
    },
    methods: {
        emitData() {
            this.$emit('update:data', this.componentData)
        },
        openProductItemInputs(event) {
            const index = event.target.id - 1
            this.componentData.productsListSection.productsList[index].isOpen = !this.componentData.productsListSection.productsList[index].isOpen
        },
        addProduct() {
            const idNewProduct = this.componentData.productsListSection.productsList.length + 1
            let newProduct =  {
                        id: idNewProduct,
                        isOpen: false,
                        image: {
                            url: 'https://github.com/alexandre-fb/pagina-com-conteudo-editavel-vue/blob/main/src/assets/product-image.png?raw=true',
                            alt: 'Imagem do produto'
                        },
                        productData: {
                            name: 'Lixadeira Roto-Orbital',
                            code: 'AT1701',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum rutrum nunc, id faucibus erat ultrices in.',
                            link: {
                                text: 'Saiba +',
                                url: 'http://www.google.com'
                            }
                        }
                    }
            if(this.componentData.productsListSection.productsList.length < 5) {
                this.componentData.productsListSection.productsList.push(newProduct)
            } 
        },
        removeProduct() {
            if (this.componentData.productsListSection.productsList.length > 1) {
                this.componentData.productsListSection.productsList.pop()
            }
        }
    }
}
</script>

<style src="../../style.scss" lang="scss" scoped></style>