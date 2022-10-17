<template>
  <div>
    <div class="news-editor">

        <div class="editor-area">
            <div class="editor-area__header">
                <h2 class="editor-area__title">Área de edição</h2>
                <button class=" button-default button-default--save-template" @click="getHtml">Salvar template</button>
            </div>

            <transition name="fade" mode="out-in">
                <div class="editor-area__section editor-area__empty" v-if="layout1.selectedSection === ''" key="empty">
                    <p class="section__title">Selecione a seção que deseja editar.</p>
                </div>

                <div class="editor-area__section editor-area__section--colors" v-else-if="layout1.selectedSection === 'colors'" key="colors-section">
                    <h3 class="section__title">Cores</h3>
                    <div class="section__inputs-container">

                        <CInput 
                            :type="'color'" 
                            :label="'Cor primária:'"
                            :for_id="'primary-color'"
                            :value.sync="layout1.primaryColor"
                        />

                        <CInput 
                            :type="'color'" 
                            :label="'Cor secundária:'"
                            :for_id="'secondary-color'"
                            :value.sync="layout1.secondaryColor"
                        />

                        <CInput 
                            :type="'color'" 
                            :label="'Cor terciária:'"
                            :for_id="'terciary-color'"
                            :value.sync="layout1.tertiaryColor"
                        />
                    </div>

                </div>

                <div class="editor-area__section editor-area__section--banner" v-else-if="layout1.selectedSection === 'bannerSection'" key="banner-section">
                    <h3 class="section__title">Imagem destaque</h3>
                    <div class="section__inputs-container">

                        <CInput 
                            :type="'url'" 
                            :label="'Imagem:'"
                            :for_id="'banner-image'"
                            :description="'Insira o link da imagem no campo acima.'"
                            :value.sync="layout1.bannerSection.image.url"
                        />

                        <CInput 
                            :type="'url'" 
                            :label="'Texto alternativo:'"
                            :for_id="'banner-image-alt'"
                            :description="'*Breve descrição da imagem. Esse texto será exibido se a imagem não puder ser exibida.'"
                            :value.sync="layout1.bannerSection.image.alt"
                        />
                        
                    </div>
                </div>
                        
                <div class="editor-area__section editor-area__section--description" v-else-if="layout1.selectedSection === 'descriptionSection'" key="description-section">
                    <h3 class="section__title">Descrição</h3>
                    <div class="section__inputs-container">
                    
                        <CInput 
                            :type="'text'" 
                            :label="'Título:'"
                            :for_id="'description-title'"
                            :value.sync="layout1.descriptionSection.title"
                        />

                        <CInput 
                            :type="'textArea'" 
                            :label="'Texto:'"
                            :for_id="'description-text'"
                            :value.sync="layout1.descriptionSection.paragraph"
                        />

                        <CInput 
                            :type="'text'" 
                            :label="'Texto do botão:'"
                            :for_id="'description-button-text'"
                            :value.sync="layout1.descriptionSection.button.text"
                        />

                        <CInput 
                            :type="'url'" 
                            :label="'Link do botão:'"
                            :for_id="'description-button-link'"
                            :value.sync="layout1.descriptionSection.button.link"
                        />

                    </div>
                </div>

                <div class="editor-area__section editor-area__section--product-list" v-else-if="layout1.selectedSection === 'productsListSection'" key="products-list">
                    <h3 class="section__title">Lista de produtos</h3>
                    <div class="section__inputs-container">

                        <CInput 
                            :type="'text'" 
                            :label="'Título:'"
                            :for_id="'products-list-title'"
                            :value.sync="layout1.productsListSection.title"
                        />
                        
                        <div class="input-item" v-for="product in layout1.productsListSection.productsList" :key="product.id">
                            <div class="collapse-title" :id="product.id" @click="openProductItemInputs">
                                <h4 :id="product.id" class="product-item__title">{{`Produto ${product.id}`}}</h4>
                                <ExpandIcon :id="product.id" :class="layout1.productsListSection.productsList[product.id - 1].isOpen ? 'isOpen' : 'isClosed'" />
                            </div>
                            <transition name="expand">
                                <div class="collapse-content" v-show="layout1.productsListSection.productsList[product.id - 1].isOpen">

                                    <CInput 
                                        :type="'url'" 
                                        :label="'Imagem:'"
                                        :for_id="'product-item-image'"
                                        :productItem="true"
                                        :description="'Insira o link da imagem no campo acima.'"
                                        :value.sync="layout1.productsListSection.productsList[product.id - 1].image.url"
                                    />

                                    <CInput 
                                        :type="'text'" 
                                        :label="'Nome:'"
                                        :for_id="'input-text-products-list-name'"
                                        :productItem="true"
                                        :value.sync="layout1.productsListSection.productsList[product.id - 1].productData.name"
                                    />

                                    <CInput 
                                        :type="'text'" 
                                        :label="'Código:'"
                                        :for_id="'input-text-products-list-code'"
                                        :productItem="true"
                                        :value.sync="layout1.productsListSection.productsList[product.id - 1].productData.code"
                                    />

                                    <CInput 
                                        :type="'textArea'" 
                                        :label="'Descrição:'"
                                        :for_id="'input-text-products-list-description'"
                                        :rows="4"
                                        :productItem="true"
                                        :value.sync="layout1.productsListSection.productsList[product.id - 1].productData.description"
                                    />

                                    <CInput 
                                        :type="'url'" 
                                        :label="'Link:'"
                                        :for_id="'input-text-products-list-link'"
                                        :productItem="true"
                                        :value.sync="layout1.productsListSection.productsList[product.id - 1].productData.link.url"
                                    />

                                </div>
                            </transition>
                        </div>
                        <div class="products-buttons-container">
                            <button 
                                class="button-default add-product-button" 
                                @click="addProduct" 
                                v-if="layout1.productsListSection.productsList.length < 5">
                                Novo produto
                            </button>
                            <button 
                                class="button-default remove-product-button" 
                                @click="removeProduct" 
                                v-if="layout1.productsListSection.productsList.length > 1">
                                Remover
                            </button>
                        </div>
                    </div>
                </div>      
            </transition>
        </div>

        <div class="layout-area">
            <CLayout1 :data="layout1" @selectSection="setSelectedSection" />
        </div>
    </div>
  </div>
</template>

<script>
import CLayout1 from './layouts/c-layout-1.vue'
import ExpandIcon from './icons/expand-icon.vue'
import CInput from './inputs/c-input.vue'

export default {
    name: 'Layout-1',
    components: { CLayout1, ExpandIcon, CInput },
    data() {
        return {
            html: null,
            testeConteudo: '',
            layout1: {
                primaryColor: '#27283f',
                secondaryColor: '#EB4041',
                tertiaryColor: '#cccccc',
                logoImageUrl: 'https://homolog.pinceisatlas.com.br/public/files/69idqhvQF6hy5rGWe9OckElmk8uQz4huPAOup6nX.png',
                bannerSection: {
                    image: {
                        url: 'https://github.com/alexandre-fb/pagina-com-conteudo-editavel-vue/blob/main/src/assets/banner-image.png?raw=true',
                        alt: 'Imagem com produtos Atlas Powertech',
                    },
                },
                descriptionSection: {
                    title: 'Linha de Máquinas Atlas Powetech',
                    paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum rutrum nunc, id faucibus erat ultrices in. In tellus enim, efficitur eu blandit et, tempus vitae justo. Ut a velit orci.',
                    button: {
                        text: 'Clique aqui e saiba mais',
                        link: 'https://www.pinceisatlas.com.br',
                    }
                },
                productsListSection: {
                    title: 'Conheça nossa linha completa de máquinas',
                    productsList: [],
                },
                selectedSection: '',
            },
        }    
    },
    beforeMount() {
        this.addProduct()
    },
    methods: {
        teste(conteudo) {
            this.testeConteudo = conteudo
            console.log(this.testeConteudo)
        },
        getHtml() {
            this.activeEditor = ''
            this.html = document.getElementById('email-layout')
            console.log(this.html)
        },
        setSelectedSection(selectedSection) {
            if (selectedSection === 'colors') {
                this.layout1.selectedSection = selectedSection
            } else if (selectedSection === 'bannerSection') {
                this.layout1.selectedSection = selectedSection
            } else if (selectedSection === 'descriptionSection') {
                this.layout1.selectedSection = selectedSection
            } else if (selectedSection === 'productsListSection') {
                this.layout1.selectedSection = selectedSection
            }
            console.log(selectedSection)
        },
        openProductItemInputs(event) {
            const index = event.target.id - 1
            this.layout1.productsListSection.productsList[index].isOpen = !this.layout1.productsListSection.productsList[index].isOpen
        },
        addProduct() {
            const idNewProduct = this.layout1.productsListSection.productsList.length + 1
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
            if(this.layout1.productsListSection.productsList.length < 5) {
                this.layout1.productsListSection.productsList.push(newProduct)
            } 
        },
        removeProduct() {
            if (this.layout1.productsListSection.productsList.length > 1) {
                this.layout1.productsListSection.productsList.pop()
            }
        }
    }
}
</script>

<style src="./style.scss" lang="scss" scoped></style>