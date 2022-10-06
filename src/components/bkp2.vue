<template>
  <div>
    
    <div class="container-area">
        <div class="editArea">
            <h2 class="edit-title">Área de edição</h2>

            <div class="title-section" v-if="showInputEditTitle">
                <h3>Edite o título no campo abaixo</h3>
                <input type="text" name="editTitle" id="editTitle" v-model="main.section.title.content" >
            </div>
            <div class="button-section" v-if="showInputEditButton">
                <h3>Edite o botão no campo abaixo</h3>
                <input type="text" name="editButton" id="editButton" v-model="buttonContent" >
            </div>
            <button style='margin-top: 50px;' @click="getHtml" v-if="showInputEditTitle || showInputEditButton">Salvar</button>
        </div>

        <div class="layout-container"
            :style="{ 
                width: '100%',
                maxWidth: '800px',
                margin: '0 auto',
            }"
        >
            <header class="header" :style="header.style">
                <img :src="header.image.url" alt="banner" class="header__image" :style="header.image.style">
                <h1 class="section__title" :style="header.title.style">{{ header.title.content }}</h1>
            </header>

            <main class="main">
                <section class="section" :style="main.section.style">
                    <h2 class="section__title" @click="() => {
                            showInputEditButton = false 
                            showInputEditTitle = true
                        }" :style="main.section.title.style">
                        {{ main.section.title.content }}
                    </h2>
                    <p class="section__paragraph" :style="sectionParagraphStyle">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum rutrum nunc, id faucibus erat ultrices in. In tellus enim, efficitur eu blandit et, tempus vitae justo. Ut a velit orci.
                    </p>
                        <button class="button" :style="buttontKnowMoreStyle" @click="() => {
                            showInputEditButton = true 
                            showInputEditTitle = false
                        }">
                        {{ buttonContent }}
                    </button>
                </section>

                <section class="main__section main__section-products-list">
                    <h2 class="section__title section__title--products-list">Conheça nossa linha completa de máquinas</h2>

                    <article class="product-item">
                        <img class="product-item__image" src="../../src/assets/product-image.png" alt="">
                        <div class="product-item__data-container">
                            <div>
                                <h3 class="product-item__title">Lixadeira Roto-Orbital</h3>
                                <h4  class="product-item__code">AT1701</h4>
                            </div>
                            <p class="product-item__decription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum rutrum nunc, id faucibus erat ultrices in. In tellus enim, efficitur eu blandit et.</p>
                            <a class="product-item__link" href="">Saiba +</a>
                        </div>
                    </article>

                    <article class="product-item product-item--reverse-direction">
                        <img class="product-item__image" src="../../src/assets/product-image.png" alt="">
                        <div class="product-item__data-container">
                            <div>
                                <h3 class="product-item__title">Lixadeira Roto-Orbital</h3>
                                <h4  class="product-item__code">AT1701</h4>
                            </div>
                            <p class="product-item__decription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum rutrum nunc, id faucibus erat ultrices in. In tellus enim, efficitur eu blandit et.</p>
                            <a class="product-item__link" href="">Saiba +</a>
                        </div>
                    </article>

                    <article class="product-item">
                        <img class="product-item__image" src="../../src/assets/product-image.png" alt="">
                        <div class="product-item__data-container">
                            <div>
                                <h3 class="product-item__title">Lixadeira Roto-Orbital</h3>
                                <h4  class="product-item__code">AT1701</h4>
                            </div>
                            <p class="product-item__decription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum rutrum nunc, id faucibus erat ultrices in. In tellus enim, efficitur eu blandit et.</p>
                            <a class="product-item__link" href="">Saiba +</a>
                        </div>
                    </article>
                </section>
            </main>
            <footer class="footer"></footer>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Layout-1',
    data() {
        return {
            html: null,
            header: {
                style: { 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    position: 'relative', 
                },
                image: {
                    url: 'https://raw.githubusercontent.com/alexandre-fb/pagina-com-conteudo-editavel-vue/main/src/assets/header-panel.png',
                    style: {
                        width: '100%',
                        objectFit: 'cover'
                    }
                },
                title: {
                    content: 'Título',
                    style: {
                        position: 'absolute',
                        fontSize: '45px',
                        color: '#fff',
                        display: 'none',
                        margin: '0',
                    }
                }
            },
            main: {
                section: {
                    style: {
                        padding: '20px',
                        backgroundColor: '#cccccc',
                        position: 'relative',
                        textAlign: 'center'
                    },
                    title: {
                        style: {
                            color: '#EB4041', 
                            fontSize: '38px', 
                            fontStyle: 'italic',
                            textAlign: 'center',
                            margin: '0'
                        },
                    content: 'Linha de Máquinas Atlas Powertech'
                    }
                },
            },
            sectionParagraphStyle: {
                color: '#000', 
                fontSize: '18px', 
                fontWeight: '600',
                textAlign: 'center'
            },
            buttontKnowMoreStyle: { 
                backgroundColor: '#EB4041',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '50px',
                fontSize: '20px',
                fontStyle: 'italic',
                fontWeight: '600',
                textAlign: 'center'
            },
            buttonContent: 'Clique aqui e saiba mais',
            showEditTitle: false,
            showInputEditTitle: false,
            showInputEditButton: false,
        }
    },
    methods: {
        getHtml() {
            this.html = document.getElementsByClassName('layout-container')[0]
            console.log(this.html)
        },
        showEditTitleButton(event) {
            console.log(event)
            event.isTrusted ? this.showEditTitle = true : false
            console.log(this.showEditTitle)
        }
    }
}
</script>

<style lang="scss" scoped> 

.container-area {
    display: flex;
    flex-direction: row-reverse;
    padding-top: 50px;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
    
    .editArea {
        width: 30%;
        background-color: #ccc;
        
        .edit-title {
            margin: 20px !important;
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

.edit-button {
    position: absolute;
    right: 20px;
    top: 40px;
    font-size: 20px;
}

.layout-container {
    height: 100%;
    max-height: 90vh;
    overflow-y: scroll;


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

