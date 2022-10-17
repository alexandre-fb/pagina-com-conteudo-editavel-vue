<template>
  <div>
    <div class="edit-colors-section"
         @mouseover="handleColorsInteraction" 
         @mouseleave="handleColorsInteraction"    
    >
        <span class="colors__title">Cores:</span>
        <div class="color" :style="{ backgroundColor: data.primaryColor }"></div>  
        <div class="color" :style="{ backgroundColor: data.secondaryColor }"></div>  
        <div class="color" :style="{ backgroundColor: data.tertiaryColor }"></div>  
        <transition name="fade">
            <div class="edit-box edit-box--colors" @click="handleColorsInteraction" v-if="showEditColorsButton || data.selectedSection === 'colors'">
                <i class="edit-icon">
                    <EditIcon />
                </i>
            </div>
        </transition> 
    </div>

    <div id="email-layout">
        <table class="email-layout"  border="0" align="center" cellpadding="0" cellspacing="0" width="100%" style="font-family: helvetica">
            <tr>
                <td>
                    <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                        <tr class="logo-section" 
                            :style="{ backgroundColor: data.primaryColor }">
                            <td align="center" 
                                style="padding: 20px; 
                                text-align: center;">
                                <img :src="data.logoImageUrl" alt="Logo Atlas">
                            </td>
                        </tr>

                        <tr class="banner-section" 
                            @mouseover="handleBannerSectionInteraction" 
                            @mouseleave="handleBannerSectionInteraction"
                        >
                            <td align="center">
                                <img :src="data.bannerSection.image.url" 
                                    :alt="data.bannerSection.image.alt" 
                                    :style="{ 
                                        width: '100%', 
                                        objectFit: 'cover', 
                                        display: 'block',
                                        maxHeight: '400px', 
                                    }"
                                >
                            </td>
                            <transition name="fade">
                                <div class="edit-box" @click="handleBannerSectionInteraction" v-if="showEditBannerSectionButton || data.selectedSection === 'bannerSection'">
                                    <i class="edit-icon">
                                        <EditIcon />
                                    </i>
                                </div>
                            </transition>
                        </tr>

                        <tr class="description-section"
                            :style="{
                                backgroundColor: data.tertiaryColor,
                                position: 'relative',
                                textAlign: 'center'
                            }"
                            @mouseover="handleDescriptionSectionInteraction" 
                            @mouseleave="handleDescriptionSectionInteraction"
                        >
                            <td style="text-align: center; 
                                    padding: 20px;"
                            >
                                <h2 class="section__title" 
                                    :style="{
                                        padding: '20px',
                                        color: data.secondaryColor, 
                                        fontSize: '30px', 
                                        fontStyle: 'italic',
                                        textAlign: 'center',
                                        margin: '0',
                                        fontWeight: '600',
                                    }"
                                >
                                    {{ data.descriptionSection.title }}
                                </h2>
                                <p class="section__paragraph"
                                :style="{
                                        color: '#000', 
                                        fontSize: '17px', 
                                        fontWeight: '500',
                                        textAlign: 'center',
                                        margin: '0',
                                        paddingBottom: '20px',
                                    }" 
                                >
                                    {{ data.descriptionSection.paragraph }}
                                </p>
                                <a :href="data.descriptionSection.button.link" target="_blank">
                                    <button class="button" 
                                            :style="{
                                                backgroundColor: data.secondaryColor,
                                                color: '#fff',
                                                padding: '10px 20px',
                                                border: 'none',
                                                borderRadius: '50px',
                                                fontSize: '20px',
                                                fontStyle: 'italic',
                                                fontWeight: '600',
                                                textAlign: 'center',
                                                marginBottom: '20px'
                                            }">
                                        {{ data.descriptionSection.button.text }}
                                    </button>
                                </a>
                            </td>
                            <transition name="fade">
                                <div class="edit-box" @click="handleDescriptionSectionInteraction" v-if="showEditDescriptionSectionButton || data.selectedSection === 'descriptionSection'">
                                    <i class="edit-icon">
                                        <EditIcon />
                                    </i>
                                </div>
                            </transition>
                        </tr>
                        <tr @mouseover="handleProductsListSectionInteraction" @mouseleave="handleProductsListSectionInteraction">
                            <td style="padding: 0;
                                    background-color: #fff;">
                                <table class="products-list-section">
                                    <tr class="products-list-section__title">
                                        <h2 :style="{
                                                padding: '20px',
                                                color: data.secondaryColor, 
                                                fontSize: '28px',
                                                fontWeight: '600', 
                                                fontStyle: 'italic',
                                                textAlign: 'center',
                                                margin: '0',
                                            }">
                                            {{ data.productsListSection.title }}
                                        </h2>
                                    </tr> 
                                    <tr>
                                        <table>
                                            <tr class="products-list-section__product-item"
                                                v-for="product in data.productsListSection.productsList" :key="product.id"
                                                :style="{
                                                    padding: '20px',
                                                    borderBottom: '1px solid lightgray',
                                                    display: 'flex',
                                                    flexDirection: product.id % 2 !== 0 ? 'row' : 'row-reverse',
                                                    gap: '20px',
                                                }"
                                            >
                                                <td class="product-item__image" width="100%">
                                                    <img class="product-item__image" 
                                                        :src="product.image.url" 
                                                        :alt="product.image.alt"
                                                        :style="{
                                                            width: '100%',
                                                            objectFit: 'cover',
                                                            display: 'block',
                                                            borderRadius: '5px',
                                                        }"
                                                    >
                                                </td>
                                                <td class="product-item__data" width="100%" :style="{
                                                    textAlign: product.id % 2 !== 0 ? 'left' : 'right'
                                                }"> 
                                                    <div>
                                                        <h3 class="product-item__name" 
                                                            :style="{
                                                                color: data.primaryColor,
                                                                fontWeight: '600',
                                                                textTransform: 'uppercase',
                                                                fontSize: '18px',
                                                                margin: '0 0 10px 0', 
                                                                padding: '0',
                                                                backgroundColor: '#fff'
                                                            }">
                                                            {{ product.productData.name }}
                                                        </h3>
                                                        <h4 class="product-item__code" 
                                                            :style="{
                                                                color: '#27283f',
                                                                fontWeight: '600',
                                                                textTransform: 'uppercase',
                                                                fontSize: '16px',
                                                                margin: '0 0 10px 0',
                                                            }">
                                                            {{product.productData.code}}
                                                        </h4>
                                                    </div>
                                                    <p class="product-item__decription" 
                                                    :style="{
                                                            color: '#333',
                                                            fontSize: '14px',
                                                        }"
                                                    >
                                                        {{product.productData.description}}
                                                    </p>
                                                    <a class="product-item__link" 
                                                        :href="product.productData.link.url"
                                                        target="_blank"
                                                        :style="{
                                                            color: data.secondaryColor,
                                                            textDecoration: 'none',
                                                            textTransform: 'uppercase',
                                                            fontWeight: '600',
                                                            fontSize: '18px',
                                                        }"
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
                                    v-if="showEditProductsListSectionButton || data.selectedSection === 'productsListSection'">
                                        <i class="edit-icon">
                                            <EditIcon />
                                        </i>
                                    </div>
                                </transition> 
                            </td>
                        </tr>

                        <tr class="footer-section" 
                            :style="{
                                backgroundColor: data.primaryColor,
                                color: '#fff',
                            }">
                            <td style="
                                    display: flex; 
                                    justify-content: space-between; 
                                    align-items: center; 
                                    padding: 15px 10px;
                                    max-width: 600px;
                                    margin: 0 auto;
                                "
                            >
                                <div class="social-links" style="display: flex; gap: 10px; align-items: center;">
                                    <a href="https://pt-br.facebook.com/pinceisatlasoficial/" target="_blank">
                                        <i :style="{
                                                height: '20px', 
                                                width: '20px', 
                                                border: '1px solid #fff', 
                                                borderRadius: '100%', 
                                                display: 'flex', 
                                                justifyContent: 'center', 
                                                aligItems: 'center',
                                                padding: '4px'
                                            }">
                                            <FacebookIcon style="fill: #fff;" />
                                        </i>
                                    </a>
                                    <a href="https://www.instagram.com/pinceisatlasoficial/" target="_blank">
                                        <i :style="{
                                                height: '20px', 
                                                width: '20px', 
                                                border: '1px solid #fff', 
                                                borderRadius: '100%', 
                                                display: 'flex', 
                                                justifyContent: 'center', 
                                                aligItems: 'center',
                                                padding: '4px'
                                            }">
                                            <InstagramIcon style="fill: #fff;" />
                                        </i>
                                    </a>
                                    <a href="https://www.youtube.com/user/pinceisatlasoficial" target="_blank">
                                        <i :style="{
                                                height: '20px', 
                                                width: '20px', 
                                                border: '1px solid #fff', 
                                                borderRadius: '100%', 
                                                display: 'flex', 
                                                justifyContent: 'center', 
                                                aligItems: 'center',
                                                padding: '4px'
                                            }">
                                            <YoutubeIcon style="fill: #fff;"/>
                                        </i>
                                    </a>
                                    <span>/picenisatlasoficial | <a href="https://www.pinceisatlas.com.br" target="_blank" style="color: #fff; text-decoration: none;">www.pinceisatlas.com.br</a></span>
                                </div>
                                <img :src="data.logoImageUrl" alt="Logo Atlas" style="object-fit: contain; width: 130px;">
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</div>
</template>

<script>

import EditIcon from '../icons/edit-icon.vue'
import FacebookIcon from '../icons/facebook-icon.vue'
import InstagramIcon from '../icons/instagram-icon.vue'
import YoutubeIcon from '../icons/youtube-icon.vue'

export default {
    name: 'CLayout1',
    components: { EditIcon, FacebookIcon, InstagramIcon, YoutubeIcon },
    props: { 
        data: Object
    },
    data() {
        return {
            showEditColorsButton: false,
            showEditBannerSectionButton: false,
            showEditDescriptionSectionButton: false,
            showEditProductsListSectionButton: false,
            selectedSection: '',
        }
    },
    methods: {
        handleColorsInteraction(event) {
            if (event.type === 'mouseover') {
                this.showEditColorsButton = true
            } else if (event.type === 'mouseleave') {
                this.showEditColorsButton = false
            } else if (event.type === 'click') {
                this.$emit('selectSection', 'colors')
            }            
        },
        handleBannerSectionInteraction(event) {
            if (event.type === 'mouseover') {
                this.showEditBannerSectionButton = true
            } else if (event.type === 'mouseleave') {
                this.showEditBannerSectionButton = false
            } else if (event.type === 'click') {
                this.$emit('selectSection', 'bannerSection') 
            }            
        },
        handleDescriptionSectionInteraction(event) {
            if (event.type === 'mouseover') {
                this.showEditDescriptionSectionButton = true
            } else if (event.type === 'mouseleave') {
                this.showEditDescriptionSectionButton = false
            } else if (event.type === 'click') {
                this.$emit('selectSection', 'descriptionSection') 
            }            
        },
        handleProductsListSectionInteraction(event) {
            if (event.type === 'mouseover') {
                this.showEditProductsListSectionButton = true
            } else if (event.type === 'mouseleave') {
                this.showEditProductsListSectionButton = false
            } else if (event.type === 'click') {
                this.$emit('selectSection', 'productsListSection')
            }            
        },
    }

}
</script>

<style lang="scss" scoped> 

//=====reset
h1, h2, h3, h4 {
    padding: 0;
    margin: 0;
    background-color: inherit;
    color: inherit;
}

td {
    padding: 0;
}
//=====end reset

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
        }

        .section__title {
            font-size: 20px;
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

                .product-item__title {
                    font-size: 16px;
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

        tr {
            position: relative;
        }

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