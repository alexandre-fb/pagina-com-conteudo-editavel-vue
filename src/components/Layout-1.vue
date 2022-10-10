<template>
  <div>
    
    <div class="container-editor">
        <div class="editor-area-container">
            <div class="editor-area">
                <h2 class="edit-area__title">Área de edição</h2>
                <div class="edit-area__content-container">
                    <transition name="fade">

                        <div class="editor editor--banner-section" v-if="activeEditor === 'bannerSection'">
                            <div class="editor__inputs-container">
                                <div class="editor__input-area">
                                    <h3 class="input-area__title">Background</h3>
                                    <div class="input-area__input-item">
                                        <label for="bg-image-banner-section" class="input-item__label">Editar background:</label>
                                        <p class="input-item__description">Insira o link da imagem no campo abaixo.</p>
                                        <input type="url" name="bg-image-banner-section" id="bg-image-banner-section" class="input-item__input" v-model="bannerSection.tr.bgImageUrl">
                                        <button class="input-item__button" @click="handleChangeBannerBgImage">Adicionar</button>
                                    </div>
                                </div>

                                <div class="editor__input-area">
                                    <h3 class="input-area__title">Título</h3>
                                    <div class="input-area__input-item">
                                        <label for="title-banner-section" class="input-item__label">Adicionar título:</label>
                                        <input type="text" name="title-banner-section" id="title-banner-section" class="input-item__input" v-model="bannerSection.td.content">
                                    </div>
                                    <div class="input-area__input-item">
                                        <label for="color-title-banner-section" class="input-item__label input-item__label--color">Selecione a cor:</label>
                                        <input type="color" name="color-title-banner-section" id="color-title-banner-section" v-model="bannerSection.td.style.color">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>

                <div class="title-section" v-if="showInputEditTitle">
                    <h3>Edite o título no campo abaixo</h3>
                    <input type="text" name="editTitle" id="editTitle" autofocus v-model="main.section.title.content" >
                </div>
                <div class="button-section" v-if="showInputEditButton">
                    <h3>Edite o botão no campo abaixo</h3>
                    <input type="text" name="editButton" id="editButton" v-model="buttonContent" >
                </div>
                <button class="save-template-button" style='margin-top: 50px;' @click="getHtml" >Salvar template</button>
            </div>
        </div>

        <div class="email-layout-container">

            <table class="email-layout" id="email-layout" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td>
                        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                            <tr class="logo-section" :style="logoSection.tr.style">
                                <td align="center" :style="logoSection.td.style">
                                    <img :src="logoImageUrl" alt="Logo Atlas">
                                </td>
                                <transition name="fade">
                                    <div class="edit-box" @click="handleBannerSectionInteraction" v-if="showEditBannerSectionButton || activeEditor === 'bannerSection'">
                                        <span class="edit-icon">
                                            <img src="../../src/assets/icons/edit-icon.png" alt="ícone de edição">
                                        </span>
                                    </div>
                                </transition>
                            </tr>

                            <tr class="banner-section" 
                                :style="bannerSection.tr.style" 
                                @mouseover="handleBannerSectionInteraction" 
                                @mouseleave="handleBannerSectionInteraction"
                            >

                                <td align="center" :style="bannerSection.td.style">
                                    {{ bannerSection.td.content }}
                                </td>

                                <transition name="fade">
                                    <div class="edit-box" @click="handleBannerSectionInteraction" v-if="showEditBannerSectionButton || activeEditor === 'bannerSection'">
                                        <span class="edit-icon">
                                            <img src="../../src/assets/icons/edit-icon.png" alt="ícone de edição">
                                        </span>
                                    </div>
                                </transition>
                            </tr>

                            <tr class="description-section"
                                :style="descriptionSection.tr.style">
                            <!-- <tr class="description-section"
                                :style="bannerSection.tr.style" 
                                @mouseover="handleBannerSectionInteraction" 
                                @mouseleave="handleBannerSectionInteraction"
                            > -->
                                <td>
                                    <h2 class="section__title" 
                                        :style="descriptionSection.td.title.style">
                                        {{ descriptionSection.td.title.content }}
                                    </h2>
                                    <p class="section__paragraph" 
                                        :style="descriptionSection.td.paragraph.style">
                                        {{ descriptionSection.td.paragraph.content }}
                                    </p>
                                    <button class="button" 
                                        :style="descriptionSection.td.button.style">
                                        {{ descriptionSection.td.button.content }}
                                    </button>
                                </td>
                                <transition name="fade">
                                    <div class="edit-box" @click="handleBannerSectionInteraction" v-if="showEditBannerSectionButton || activeEditor === 'bannerSection'">
                                        <span class="edit-icon">
                                            <img src="../../src/assets/icons/edit-icon.png" alt="ícone de edição">
                                        </span>
                                    </div>
                                </transition>
                            </tr>

                            <table class="products-list-section" 
                                :style="productsListSection.table.style">
                                <tr class="products-list-section__title">
                                    <h2 :style="productsListSection.title.style">
                                        {{ productsListSection.title.content }}
                                    </h2>
                                    <transition name="fade">
                                        <div class="edit-box" @click="handleBannerSectionInteraction" v-if="showEditBannerSectionButton || activeEditor === 'bannerSection'">
                                            <span class="edit-icon">
                                                <img src="../../src/assets/icons/edit-icon.png" alt="ícone de edição">
                                            </span>
                                        </div>
                                    </transition>
                                </tr> 
                                <tr>
                                    <table>
                                        <tr 
                                            class="products-list-section__product-item"
                                            v-for="item in productsListSection.productsList" :key="item.id"
                                            :style="item.id % 2 !== 0 ? productsListSection.styles.productItem : productsListSection.styles.productItemReverse">
                                            <td class="product-item__image" width="100%">
                                                <img 
                                                    class="product-item__image" 
                                                    :src="item.image.url" 
                                                    :alt="item.image.alt"
                                                    :style="productsListSection.styles.image"
                                                >
                                            </td>
                                            <td class="product-item__data" width="100%"> 
                                                <div>
                                                    <h3 class="product-item__title" :style="productsListSection.styles.productName">
                                                        {{ item.productData.name }}
                                                    </h3>
                                                    <h4 class="product-item__code" :style="productsListSection.styles.productCode">
                                                        {{item.productData.code}}
                                                    </h4>
                                                </div>
                                                <p class="product-item__decription" :style="productsListSection.styles.productDescription">
                                                    {{item.productData.description}}
                                                </p>
                                                <a 
                                                    class="product-item__link" 
                                                    :href="item.productData.link.url"
                                                    target="_blank"
                                                    :style="productsListSection.styles.productLink"
                                                >
                                                    {{item.productData.link.text}}
                                                </a>
                                            </td>
                                            <transition name="fade">
                                                <div class="edit-box" @click="handleBannerSectionInteraction" v-if="showEditBannerSectionButton || activeEditor === 'bannerSection'">
                                                    <span class="edit-icon">
                                                        <img src="../../src/assets/icons/edit-icon.png" alt="ícone de edição">
                                                    </span>
                                                </div>
                                            </transition>
                                        </tr>
                                    </table>
                                </tr> 
                            </table>  
                            <tr class="footer-section" :style="footerSection.style">
                                <td 
                                    style="display: flex; 
                                    justify-content: space-between; 
                                    align-items: center; 
                                    padding: 15px 10px;"
                                >
                                    <div class="social-links" style="display: flex; gap: 10px; align-items: center;" >
                                        <i :style="footerSection.iconsStyle">
                                            <FacebookIcon style="fill: #fff;" />
                                        </i>
                                        <i :style="footerSection.iconsStyle">
                                            <InstagramIcon style="fill: #fff;" />
                                        </i>
                                        <i :style="footerSection.iconsStyle">
                                            <YoutubeIcon style="fill: #fff;"/>
                                        </i>
                                        <span>/picenisatlasoficial | <a href="https://www.pinceisatlas.com.br" target="_blank" style="color: #fff; text-decoration: none;">www.pinceisatlas.com.br</a></span>
                                    </div>
                                    <img :src="logoImageUrl" alt="Logo Atlas" style="object-fit: contain; width: 130px;">
                                    <transition name="fade">
                                        <div class="edit-box" @click="handleBannerSectionInteraction" v-if="showEditBannerSectionButton || activeEditor === 'bannerSection'">
                                            <span class="edit-icon">
                                                <img src="../../src/assets/icons/edit-icon.png" alt="ícone de edição">
                                            </span>
                                        </div>
                                    </transition>
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
import FacebookIcon from '../assets/icons/facebook-icon.vue'
import InstagramIcon from '../assets/icons/instagram-icon.vue'
import YoutubeIcon from '../assets/icons/youtube-icon.vue'

export default {
    name: 'Layout-1',
    components: { FacebookIcon, InstagramIcon, YoutubeIcon },
    data() {
        return {
            html: null,
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
                tr: {
                    bgImageUrl: 'https://raw.githubusercontent.com/alexandre-fb/pagina-com-conteudo-editavel-vue/main/src/assets/banner-image.png',
                    style: {
                        backgroundImage: 'url(https://raw.githubusercontent.com/alexandre-fb/pagina-com-conteudo-editavel-vue/main/src/assets/banner-image.png)',
                        backgroundPosition: 'center', 
                        backgroundSize: 'cover', 
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: '#D9D9D9',
                        height: '450px',
                        transition: '300ms ease'
                    }
                }, 
                td: {
                    content: '',
                    style: {
                        color: '#fff',
                        fontSize: '42px',
                        fontWeight: '600',
                        display: '',
                    },
                },
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
                        fontSize: '28px', 
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
                    },
                    productCode: {
                        color: '#27283f',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        fontSize: '16px',
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
                    {
                        id: 2,
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
                    height: '25px', 
                    width: '25px', 
                    border: '1px solid #fff', 
                    borderRadius: '100%', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    aligItems: 'center',
                    padding: '4px'
                }
            },
            showEditBannerSectionButton: false,
            activeEditor: '',

            ////========================
           
            showEditTitle: false,
            showInputEditTitle: false,
            showInputEditButton: false,
            selectedBgImage: null
        }
    },
    methods: {
        getHtml() {
            this.html = document.getElementById('email-layout')
            console.log(this.html)
             
        },
        showEditTitleButton(event) {
            console.log(event)
            event.isTrusted ? this.showEditTitle = true : false
            console.log(this.showEditTitle)
        },
        showEditButton(event) {
            event.type === 'mouseover' ? this.showEditBannerSectionButton = true :                this.showEditBannerSectionButton = false
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
        handleChangeBannerBgImage() {
            this.bannerSection.tr.style.backgroundImage = `url(${this.bannerSection.tr.bgImageUrl})`
        }
    }
}
</script>

<style lang="scss" scoped> 
//=====transitions
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
//=====end transitions

.edit-box {
    position: absolute;
    right: 0px;
    top: 0px;
    background-color: rgba(0, 0, 0, 0.1);
    height: 100%;
    width: 100%;
    border: 3px solid #fff;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    cursor: pointer;
    box-shadow: 0 0 10px #000;

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
        box-shadow: 0 0 5px rgb(196, 196, 196);
    }

        img {
            height: 70%;
            transition: 300ms ease;
        }
}

tr {
    position: relative;
}

button {
    padding: 5px 10px;
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



.container-editor {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    height: 100vh;

    .editor-area-container {
        width: 400px;
    
        .editor-area {
            height: 100vh;
            min-width: 250px;
            background-color: rgb(249, 249, 249);
            padding: 20px;
            position: relative;

            .save-template-button {
                width: 80%;
                position: absolute;
                bottom: 40px;
                left: 50%;
                transform: translateX(-50%)
            }

            .edit-area__title {
                text-align: center;
                font-size: 22px;
            }

            .edit-area__content-container {
                .edit-content__title {
                    font-weight: 400;
                }

                .editor__inputs-container {

                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    margin-top: 20px;

                    .editor__input-area {
                        padding: 15px;
                        display: flex;
                        flex-direction: column;
                        gap: 20px;
                        border: 1px solid rgb(240, 240, 240);
                        transition: 300ms ease;

                        &:hover {
                            box-shadow: 0 0 5px #ccc;
                        }

                        .input-area__title {
                            font-weight: 500;
                        }
            
                        .input-area__input-item {


                            .input-item__input {
                                border: none;
                                padding: 10px;
                                border-radius: 5px;
                                margin-top: 10px;
                                color: #777;
                                border: 1px solid rgb(177, 177, 177);
                            }

                            .input-item__label--color {
                                margin-right: 10px;
                            }
                            
                            .input-item__description {
                                font-size: 14px;
                                margin: 5px 0;
                            }

                            .input-item__button {
                                padding: 5px 10px;
                                margin-top: 15px;
                                background-color: rgb(0, 143, 215);
                                color: #fff;
                                border: none;
                                cursor: pointer;
                            }
                        }   
                    }
                }
            }
            
            .title-section, .button-section {
                input {
                    margin-top: 20px;
                    width: 300px;
                    height: 50px;
                    padding: 20px;
                    text-align: center;
                }
            }
            
        }
    }

    .email-layout-container {
        width: 100%;
        height: 100vh;
        overflow-y: scroll;
        padding: 30px;
        background-color: #f0f0f0;
        
    
        .email-layout {
            width: 100%;
        }
    }
}

.layout-container {
    height: 100%;
    max-height: 90vh;
    overflow-y: scroll;
    background-color: #fff;
    

    .main__section {
        padding: 20px;

        .section__title {
            color: #EB4041; 
            font-size: 38px; 
            font-style: italic;
        }

        .section__paragraph {
            color: #000; 
            font-weight: 600;
            font-size: 18px;
        }

        .product-item {
            padding: 20px 0;
            border-bottom: 1px solid lightgray;
            margin-top: 20px;
            display: flex;
            gap: 30px;
            
            &:last-child {
                border-bottom: none;
            }
            .product-item__image {
                height: min-content;
            }

            .product-item__data-container {
                text-align: left;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 10px;

                .product-item__title {
                    font-size: 20px;
                    text-transform: uppercase;
                }

                .product-item__decription {
                    margin: 0;
                }

                .product-item__link {
                    color: #EB4041;
                    text-decoration: none;
                    text-transform: uppercase;
                    font-weight: 600;
                    font-size: 18px;
                }
            }
        }

        .product-item--reverse-direction {
            flex-direction: row-reverse;

            .product-item__data-container {
                text-align: right;
            } 
        }
    }

    .section--machine-line {
        
        .button--seemore {
            position: absolute;
            left: 50%;
            transform: translate(-50%)
        }
    }

    .main__section-products-list {
        padding-top: 50px;

        .section__title--products-list {
            font-size: 32px;
        }
    }
}
    
</style>>

