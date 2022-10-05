<template>
  <div>
    <h1>Layout 1</h1>

    <div class="layout-container" 
         style="width: 100%;
                max-width: 800px;
                margin: 0 auto;
                height: 1200px;"
    >
        <header class="header"
                style="display: flex;">

            <img src="../../src/assets/header-panel.png" 
                 alt="powerteck-banner" 
                 class="header__image"
                 style="width: 100%;
                        object-fit: cover;"
            >
        </header>
        <main class="main">
            <section class="main__section main__section--machine-line">
                <h2 class="section__title">Linha de Máquinas Atlas Powertech</h2>
                <p class="section__paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum rutrum nunc, id faucibus erat ultrices in. In tellus enim, efficitur eu blandit et, tempus vitae justo. Ut a velit orci.</p>
                <button class="button button--seemore">Clique aqui e saiba mais</button>
            </section>

            <section class="main__section main__section-products-list"
                style="">
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
</template>

<script>
export default {
    name: 'Layout-1'
}
</script>

<style lang="scss" scoped>  
.layout-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    height: 1200px;

    .button {
        background-color: #EB4041;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 20px;
        font-size: 20px;
        font-style: italic;
        font-weight: 600;
    }
    
    .header {
        display: flex;

        .header__image {
            width: 100%;
            object-fit: cover;
        }
    }

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

    .main__section--machine-line {
        background-image: url(../../src/assets/texture.png);
        position: relative;

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

