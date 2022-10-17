<template>
  <div>
    <div class="container-mail-editor">

        <div class="editor-area">
            <div class="editor-area__header">
                <h2 class="editor-area__title">Área de edição</h2>
                <button class=" button-default save-template-button" @click="getHtml">Salvar template</button>
            </div>

            <transition name="fade" mode="out-in">
                <div class="editor-area__section editor-area__section--colors" v-if="activeEditor === ''" key="colors-section">
                    <p class="section__title">Selecione a seção que deseja editar.</p>
                </div>

                <div class="editor-area__section editor-area__section--colors" v-else-if="activeEditor === 'colors'" key="colors-section">
                    <h3 class="section__title">Cores</h3>
                    <div class="section__inputs-container">
                        
                        <div class="section__input-item">
                            <label for="input-color-header" class="input-item__label">Cor primária:</label>
                            <input type="color" name="input-color-header" id="input-color-header" class="input-color" v-model="primaryColor">
                        </div>

                        <div class="section__input-item">
                            <label for="input-color-primary" class="input-item__label">Cor secundária:</label>
                            <input type="color" name="input-color" id="input-color-primary" class="input-color" v-model="secondaryColor">
                        </div>

                        <div class="section__input-item">
                            <label for="input-color-tertiary" class="input-item__label">Cor terciária:</label>
                            <input type="color" name="input-color" id="input-color-tertiar" class="input-color" v-model="tertiaryColor">
                        </div>
                        
                    </div>
                </div>

                <div class="editor-area__section editor-area__section--banner" v-else-if="activeEditor === 'bannerSection'" key="banner-section">
                    <h3 class="section__title">Imagem destaque</h3>
                    <div class="section__inputs-container">
                       
                        <div class="section__input-item">
                            <label for="input-url-banner" class="input-item__label">Imagem:</label>
                            <p class="input-item__description">Insira o link da imagem no campo abaixo.</p>
                            <input type="url" name="input-url-banner" id="input-url-banner" class="input-url" v-model="bannerSection.image.url">
                        </div>
                        
                    </div>
                </div>
                        
                <div class="editor-area__section editor-area__section-description" v-else-if="activeEditor === 'descriptionSection'" key="description-section">
                    <h3 class="section__title">Descrição</h3>
                    <div class="section__inputs-container">

                        <div class="section__input-item">
                            <label for="input-text-description-title" class="input-item__label">Título:</label>
                            <input type="text" name="input-text-description-title" id="input-text-description-title" class="input-text" v-model="descriptionSection.td.title.content">
                        </div>

                        <div class="section__input-item">
                            <label for="input-text-description-text" class="input-item__label">Texto:</label>
                            <textarea rows="7"  name="input-text-description-text" id="input-text-description-text" class="text-area" v-model="descriptionSection.td.paragraph.content" />
                        </div>

                        <div class="section__input-item">
                            <label for="input-text-description-button-text" class="input-item__label">Texto do botão:</label>
                            <input type="text" name="input-text-description-button-text" id="input-text-description-button-text" class="input-text" v-model="descriptionSection.td.button.content">
                        </div>

                        <div class="section__input-item">

                            <label for="input-text-description-button-link" class="input-item__label">Link do botão:</label>
                            <input type="url" name="input-text-description-button-link" id="input-text-description-button-link" class="input-url" v-model="descriptionSection.td.button.link">

                        </div>
                    </div>
                </div>

                <div class="editor-area__section editor-area__section--header" v-else-if="activeEditor === 'productsListSection'" key="logo-section">
                    <h3 class="section__title">Lista de produtos</h3>
                    <div class="section__inputs-container">
                        
                        <div class="section__input-item">
                            <label for="input-text-products-list-title" class="input-item__label">Título:</label>
                            <input type="text" name="input-text-products-list-title" id="input-text-products-list-title" class="input-text" v-model="productsListSection.title.content">
                        </div>
                        
                        <div class="section__input-item" v-for="product in productsListSection.productsList" :key="product.id">
                            <div class="collapse-title" :id="product.id" @click="handleProductClick">
                                <h4 :id="product.id">{{`Produto ${product.id}`}}</h4>
                                <ExpandIcon :id="product.id" :class="productsListSection.productsList[product.id - 1].isCollapsed ? 'isOpen' : 'isClosed'" />
                            </div>
                            <transition name="expand">
                                <div class="collapse-content" v-show="productsListSection.productsList[product.id - 1].isCollapsed">
                                    <div class="product-item-input">
                                        <label for="input-list-image" class="input-item__label">Imagem:</label>
                                        <p class="input-item__description">Insira o link da imagem no campo abaixo.</p>
                                        <input type="url" name="input-list-image" id="input-list-image" class="input-url" v-model="productsListSection.productsList[product.id - 1].image.url">
                                    </div>

                                    <div class="product-item-input">
                                        <label for="input-text-products-list-name" class="input-item__label">Nome:</label>
                                        <input type="text" name="input-text-products-list-name" id="input-text-products-list-name" class="input-text" v-model="productsListSection.productsList[product.id - 1].productData.name">
                                    </div>

                                    <div class="product-item-input">
                                        <label for="input-text-products-list-code" class="input-item__label">Código:</label>
                                        <input type="text" name="input-text-products-list-code" id="input-text-products-list-code" class="input-text" v-model="productsListSection.productsList[product.id - 1].productData.code">
                                    </div>

                                    <div class="product-item-input">
                                        <label for="input-text-products-list-description" class="input-item__label">Descrição:</label>
                                        <textarea rows="5"  name="input-text-products-list-description" id="input-text-products-list-description" class="text-area" v-model="productsListSection.productsList[product.id - 1].productData.description" />
                                    </div>

                                    <div class="product-item-input">
                                        <label for="input-text-products-list-link" class="input-item__label">Link:</label>
                                        <input type="url" name="input-text-products-list-link" id="input-text-products-list-link" class="input-url" v-model="productsListSection.productsList[product.id - 1].productData.link.url">
                                    </div>

                                </div>
                            </transition>
                        </div>
                        <div class="products-buttons-container">
                            <button 
                                class="button-default add-product-button" 
                                @click="addProduct" 
                                v-if="this.productsListSection.productsList.length < 5">
                                Novo produto
                            </button>
                            <button 
                                class="button-default remove-product-button" 
                                @click="removeProduct" 
                                v-if="this.productsListSection.productsList.length > 1">
                                Remover
                            </button>
                        </div>
                    </div>
                </div>      
            </transition>
        </div>

        <div class="email-layout-container" id="email-layout">
            <div 
                class="edit-colors-section"
                @mouseover="handleColorsInteraction" 
                @mouseleave="handleColorsInteraction"    
            >
                <span class="colors__title">Cores:</span>
                <div class="color" :style="{ backgroundColor: primaryColor }"></div>  
                <div class="color" :style="{ backgroundColor: secondaryColor }"></div>  
                <div class="color" :style="{ backgroundColor: tertiaryColor }"></div>  
                <transition name="fade">
                    <div class="edit-box edit-box--colors" @click="handleColorsInteraction" v-if="showEditColorsButton || activeEditor === 'colors'">
                        <i class="edit-icon">
                            <EditIcon />
                        </i>
                    </div>
                </transition> 
            </div>
            <table class="email-layout" border="0" align="center" cellpadding="0" cellspacing="0" width="100%" style="font-family: helvetica">
                <tr>
                    <td>
                        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                            <tr class="logo-section" :style="logoSection.tr.style">
                                <td align="center" :style="logoSection.td.style">
                                    <img :src="logoImageUrl" alt="Logo Atlas">
                                </td>
                            </tr>

                            <tr class="banner-section" 
                                @mouseover="handleBannerSectionInteraction" 
                                @mouseleave="handleBannerSectionInteraction"
                            >
                                <td align="center" :style="bannerSection.style">
                                    <img :src="bannerSection.image.url" :alt="bannerSection.image.alt" :style="bannerSection.image.style">
                                </td>

                                <transition name="fade">
                                    <div class="edit-box" @click="handleBannerSectionInteraction" v-if="showEditBannerSectionButton || activeEditor === 'bannerSection'">
                                        <i class="edit-icon">
                                            <EditIcon />
                                        </i>
                                    </div>
                                </transition>
                            </tr>

                            <tr class="description-section"
                                :style="descriptionSection.tr.style"
                                @mouseover="handleDescriptionSectionInteraction" 
                                @mouseleave="handleDescriptionSectionInteraction"
                            >
                                <td>
                                    <h2 class="section__title" 
                                        :style="descriptionSection.td.title.style">
                                        {{ descriptionSection.td.title.content }}
                                    </h2>
                                    <p class="section__paragraph" 
                                        :style="descriptionSection.td.paragraph.style">
                                        {{ descriptionSection.td.paragraph.content }}
                                    </p>
                                    <a :href="descriptionSection.td.button.link" target="_blank">
                                        <button class="button" 
                                            :style="descriptionSection.td.button.style">
                                            {{ descriptionSection.td.button.content }}
                                        </button>
                                    </a>
                                    
                                </td>
                                <transition name="fade">
                                    <div class="edit-box" @click="handleDescriptionSectionInteraction" v-if="showEditDescriptionSectionButton || activeEditor === 'descriptionSection'">
                                        <i class="edit-icon">
                                            <EditIcon />
                                        </i>
                                    </div>
                                </transition>
                            </tr>
                            <tr @mouseover="handleProductsListSectionInteraction" @mouseleave="handleProductsListSectionInteraction">
                                <td>
                                    <table class="products-list-section" 
                                        :style="productsListSection.table.style"
                                        
                                    >
                                        <tr class="products-list-section__title">
                                            <h2 :style="productsListSection.title.style">
                                                {{ productsListSection.title.content }}
                                            </h2>
                                        </tr> 
                                        <tr>
                                            <table>
                                                <tr 
                                                    class="products-list-section__product-item"
                                                    v-for="product in productsListSection.productsList" :key="product.id"
                                                    :style="product.id % 2 !== 0 ? productsListSection.styles.productItem : productsListSection.styles.productItemReverse">
                                                    <td class="product-item__image" width="100%">
                                                        <img 
                                                            class="product-item__image" 
                                                            :src="product.image.url" 
                                                            :alt="product.image.alt"
                                                            :style="productsListSection.styles.image"
                                                        >
                                                    </td>
                                                    <td class="product-item__data" width="100%"> 
                                                        <div>
                                                            <h3 class="product-item__title" :style="productsListSection.styles.productName">
                                                                {{ product.productData.name }}
                                                            </h3>
                                                            <h4 class="product-item__code" :style="productsListSection.styles.productCode">
                                                                {{product.productData.code}}
                                                            </h4>
                                                        </div>
                                                        <p class="product-item__decription" :style="productsListSection.styles.productDescription">
                                                            {{product.productData.description}}
                                                        </p>
                                                        <a 
                                                            class="product-item__link" 
                                                            :href="product.productData.link.url"
                                                            target="_blank"
                                                            :style="productsListSection.styles.productLink"
                                                        >
                                                            {{product.productData.link.text}}
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </tr>

                                    </table> 
                                    <transition name="fade">
                                        <div class="edit-box" @click="handleProductsListSectionInteraction" 
                                        v-if="showEditProductsListSectionButton || activeEditor === 'productsListSection'">
                                            <i class="edit-icon">
                                                <EditIcon />
                                            </i>
                                        </div>
                                    </transition> 
                                </td>
                            </tr>

                            <tr class="footer-section" :style="footerSection.style">
                                <td 
                                    style="display: flex; 
                                    justify-content: space-between; 
                                    align-items: center; 
                                    padding: 15px 10px;
                                    max-width: 600px;
                                    margin: 0 auto;
                                    "
                                >
                                    <div class="social-links" style="display: flex; gap: 10px; align-items: center;">
                                        <a href="https://pt-br.facebook.com/pinceisatlasoficial/" target="_blank">
                                            <i :style="footerSection.iconsStyle">
                                                <FacebookIcon style="fill: #fff;" />
                                            </i>
                                        </a>
                                        <a href="https://www.instagram.com/pinceisatlasoficial/" target="_blank">
                                            <i :style="footerSection.iconsStyle">
                                                <InstagramIcon style="fill: #fff;" />
                                            </i>
                                        </a>
                                        <a href="https://www.youtube.com/user/pinceisatlasoficial" target="_blank">
                                            <i :style="footerSection.iconsStyle">
                                                <YoutubeIcon style="fill: #fff;"/>
                                            </i>
                                        </a>
                                        <span>/picenisatlasoficial | <a href="https://www.pinceisatlas.com.br" target="_blank" style="color: #fff; text-decoration: none;">www.pinceisatlas.com.br</a></span>
                                    </div>
                                    <img :src="logoImageUrl" alt="Logo Atlas" style="object-fit: contain; width: 130px;">
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
import EditIcon from './icons/edit-icon.vue'
import FacebookIcon from './icons/facebook-icon.vue'
import InstagramIcon from './icons/instagram-icon.vue'
import YoutubeIcon from './icons/youtube-icon.vue'
import ExpandIcon from './icons/expand-icon.vue'

export default {
    name: 'Layout-1',
    components: { EditIcon, FacebookIcon, InstagramIcon, YoutubeIcon, ExpandIcon },
    data() {
        return {
            html: null,
            primaryColor: '#27283f',
            secondaryColor: '#EB4041',
            tertiaryColor: '#cccccc',
            logoImageUrl: 'https://homolog.pinceisatlas.com.br/public/files/69idqhvQF6hy5rGWe9OckElmk8uQz4huPAOup6nX.png',
            logoSection: {
                tr: {
                    style: {
                        backgroundColor: '#27283f', 
                    }
                }, 
                td: {
                    style: {
                        padding: '20px',
                    }
                },
            },
            bannerSection: {
                image: {
                    url: 'https://github.com/alexandre-fb/pagina-com-conteudo-editavel-vue/blob/main/src/assets/banner-image.png?raw=true',
                    alt: '',
                    style: {
                        width: '100%', 
                        objectFit: 'cover', 
                        display: 'block',
                        maxHeight: '400px',
                    }
                },
                style: {
                    backgroundColor: '#D9D9D9',
                    height: '100%',
                    transition: '300ms ease',
                    maxHeight: '200px'
                }
                
            },
            descriptionSection: {
                tr: {
                    style: {
                        padding: '20px',
                        backgroundColor: '#cccccc',
                        position: 'relative',
                        textAlign: 'center'
                    },
                },
                td: {
                    title: {
                        content: 'Linha de Máquinas Atlas Powetech',
                        style: {
                            padding: '20px',
                            color: '#EB4041', 
                            fontSize: '30px', 
                            fontStyle: 'italic',
                            textAlign: 'center',
                            margin: '0',
                        },
                    },
                    paragraph: {
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum rutrum nunc, id faucibus erat ultrices in. In tellus enim, efficitur eu blandit et, tempus vitae justo. Ut a velit orci.',
                        style: {
                            color: '#000', 
                            fontSize: '18px', 
                            fontWeight: '600',
                            textAlign: 'center',
                            margin: '0',
                            paddingBottom: '20px',
                        }
                    },
                    button: {
                        content: 'Clique aqui e saiba mais',
                        link: 'https://www.pinceisatlas.com.br',
                        style: {
                            backgroundColor: '#EB4041',
                            color: '#fff',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '50px',
                            fontSize: '20px',
                            fontStyle: 'italic',
                            fontWeight: '600',
                            textAlign: 'center',
                            marginBottom: '20px'
                        }
                    }
                },
            },
            productsListSection: {
                table: {
                    style: {
                        backgroundColor: '#fff'
                    },
                },
                title: {
                    content: 'Conheça nossa linha completa de máquinas',
                    style: {
                        padding: '20px',
                        color: '#EB4041', 
                        fontSize: 28, 
                        fontStyle: 'italic',
                        textAlign: 'center',
                        margin: '0',
                    },
                },
                styles: {
                    productItem: {
                        padding: '20px',
                        borderBottom: '1px solid lightgray',
                        display: 'flex',
                        gap: '20px',
                    },
                    productItemReverse: {
                        padding: '20px',
                        borderBottom: '1px solid lightgray',
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        gap: '20px',
                    },
                    image: {
                        width: '100%',
                        objectFit: 'cover',
                    },
                    productName:{ 
                        color: '#27283f',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        fontSize: '18px',
                        margin: '0',   
                    },
                    productCode: {
                        color: '#27283f',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        fontSize: '16px',
                        margin: '0', 
                    },
                    productDescription: {
                        color: '#333',
                        fontSize: '14px',
                    },
                    productLink: {
                        color: '#EB4041',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                        fontSize: '18px',
                    },
                },
                productsList: [
                    {
                        id: 1,
                        isCollapsed: false,
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
                    },
                ],
            },
            footerSection: {
                style: {
                    backgroundColor: '#252642',
                    color: '#fff',
                },
                iconsStyle: {
                    height: '20px', 
                    width: '20px', 
                    border: '1px solid #fff', 
                    borderRadius: '100%', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    aligItems: 'center',
                    padding: '4px'
                }
            },
            showEditColorsButton: false,
            showEditBannerSectionButton: false,
            showEditDescriptionSectionButton: false,
            showEditProductsListSectionButton: false,
            activeEditor: '',
        }
    },
    updated () {
        this.logoSection.tr.style.backgroundColor = this.primaryColor
        this.footerSection.style.backgroundColor = this.primaryColor
        this.descriptionSection.td.title.style.color = this.secondaryColor
        this.descriptionSection.td.button.style.backgroundColor = this.secondaryColor
        this.productsListSection.title.style.color = this.secondaryColor
        this.productsListSection.styles.productLink.color = this.secondaryColor
        this.productsListSection.styles.productName.color = this.primaryColor
        this.productsListSection.styles.productCode.color = this.primaryColor
        this.descriptionSection.tr.style.backgroundColor = this.tertiaryColor
    },
    methods: {
        getHtml() {
            this.activeEditor = ''
            this.html = document.getElementById('email-layout')
            console.log(this.html)
            console.log(this.productsListSection.productsList[0].isCollapsed)
        },
        handleColorsInteraction(event) {
            if (event.type === 'mouseover') {
                this.showEditColorsButton = true
            } else if (event.type === 'mouseleave') {
                this.showEditColorsButton = false
            } else if (event.type === 'click') {
                this.activeEditor = 'colors' 
            }            
        },
        handleBannerSectionInteraction(event) {
            if (event.type === 'mouseover') {
                this.showEditBannerSectionButton = true
            } else if (event.type === 'mouseleave') {
                this.showEditBannerSectionButton = false
            } else if (event.type === 'click') {
                this.activeEditor = 'bannerSection' 
            }            
        },
        handleDescriptionSectionInteraction(event) {
            if (event.type === 'mouseover') {
                this.showEditDescriptionSectionButton = true
            } else if (event.type === 'mouseleave') {
                this.showEditDescriptionSectionButton = false
            } else if (event.type === 'click') {
                this.activeEditor = 'descriptionSection' 
            }            
        },
        handleProductsListSectionInteraction(event) {
            if (event.type === 'mouseover') {
                this.showEditProductsListSectionButton = true
            } else if (event.type === 'mouseleave') {
                this.showEditProductsListSectionButton = false
            } else if (event.type === 'click') {
                this.activeEditor = 'productsListSection' 
            }            
        },
        handleProductClick(event) {
            const index = event.target.id - 1
            this.productsListSection.productsList[index].isCollapsed = !this.productsListSection.productsList[index].isCollapsed
        },
        addProduct() {
            const idNewProduct = this.productsListSection.productsList.length + 1

            let newProduct =  {
                        id: idNewProduct,
                        isCollapsed: false,
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

            if(this.productsListSection.productsList.length < 5) {
                this.productsListSection.productsList.push(newProduct)
            } 
        },
        removeProduct() {
            if (this.productsListSection.productsList.length > 1) {
                this.productsListSection.productsList.pop()
            }
            
        }
    }
}
</script>

<style lang="scss" scoped> 
//=====transitions
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}

.expand-enter-active  {
  transition: .3s ease;
}

.expand-leave-active {
    transition: .2s ease;
}
.expand-enter, .expand-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.isOpen {
    transition: .2s ease;
    transform: none;
}

.isClosed {
    transition: .3s ease-in-out;
    transform: rotate(-90deg);
}

//=====end transitions

//=====start edit box in section hover

.edit-box {
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    width: 100%;
    border: 3px solid #fff;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    cursor: pointer;
    box-shadow: 0 0 10px #909090;
    z-index: 5;

    .edit-icon {
        background-color: #fff;
        width: 30px;
        height: 30px;
        position: relative;
        top: -15px;
        right: -15px;
        display: grid;
        place-items: center;
        border-radius: 3px;
        box-shadow: 0 0 10px rgb(196, 196, 196);
        padding: 5px;
    }
}
//=====end edit box in section hover

tr {
    position: relative;
}

.button-default {
    padding: 10px 15px;
    margin-top: 15px;
    background-color: rgb(0, 143, 215);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: 300ms ease;

    &:hover {
        background-color: rgb(0, 109, 163); 
    }
}

.remove-product-button {
    background-color: rgb(215, 0, 0);

    &:hover {
        background-color: rgb(163, 0, 0); 
    }
}


.container-mail-editor {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    height: 100vh;

    .editor-area {
        width: 450px;
        height: 100%;
        max-height: 100vh;
        min-width: 250px;
        background-color: rgb(249, 249, 249);
        padding: 20px;
        position: relative;
        overflow-y: scroll;

        .editor-area__header {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            border-bottom: 1px solid lightgrey;
            margin-bottom: 40px;

            .editor-area__title {
                text-align: center;
                font-size: 22px;
            }

            .save-template-button {
                width: 100%;
                margin: 20px 0;
            }
        
            .section__title {
                font-weight: 600;
            }
        }

        .section__inputs-container {
            display: flex;
            flex-direction: column;
            margin-top: 20px;

            .section__input-item {
                padding: 35px;
                display: flex;
                flex-direction: column;
                border: 1px solid rgb(240, 240, 240);
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

                .input-color {
                    cursor: pointer;
                    margin-top: 10px;
                }

                .input-url, .input-text, .text-area, .input-number {
                    border: none;
                    padding: 10px;
                    margin-top: 10px;
                    color: #777;
                    border: 1px solid rgb(177, 177, 177);
                    width: 100%;
                    font-family: inherit;
                    font-size: 14px;
                }     

                .collapse-title {
                    background-color: rgb(210, 210, 210);
                    padding: 15px;
                    text-align: center;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;

                    svg {
                        width: 15px;
                        fill: #777;
                        position: absolute;
                        left: 15px;
                    }
                }

                .collapse-content {
                    padding: 15px;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .input-item__description {
                    margin: 5px;
                    font-size: 14px;
                    font-style: italic;
                }
            }

            .products-buttons-container {
                display: flex;
                justify-content: center;
                gap: 20px;
            }
        }
    }

    .email-layout-container {
        width: 100%;
        height: 100vh;
        overflow-y: scroll;
        padding: 30px;
        background-color: #f0f0f0;

        .edit-colors-section {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            width: 600px;
            margin: 0 auto;
            position: relative;
            width: fit-content;
            margin-bottom: 20px;

            .colors__title {
                margin-right: 15px;
            }
            
            .color {
                width: 30px;
                height: 30px;
            }
        }
        
        .email-layout {
            width: 100%;
        }

        .footer-section {
            max-width: 600px;
        }
    }
}
    
</style>

