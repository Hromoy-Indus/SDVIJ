/*---------------------------------- Главная --------------------------------------*/
/*------------------------------(анимация зацепок)---------------------------------*/

const homeBlock = document.querySelector('.home');
const homeItems = document.querySelectorAll('.home-item');

if (homeBlock && homeItems.length > 0) {
    homeItems.forEach((item) => {
        const turn = item.dataset.turn || '3';
        item.style.setProperty('--turn', `${turn}deg`);
    });

    homeBlock.addEventListener('mousemove', (event) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const mouseX = (event.clientX - centerX) / centerX;
        const mouseY = (event.clientY - centerY) / centerY;

        homeBlock.style.setProperty('--back-x', `${mouseX * -8}px`);
        homeBlock.style.setProperty('--back-y', `${mouseY * -8}px`);

        homeItems.forEach((item) => {
            const move = Number(item.dataset.move) || 8;

            item.style.setProperty('--move-x', `${mouseX * move}px`);
            item.style.setProperty('--move-y', `${mouseY * move}px`);
        });
    });

    homeBlock.addEventListener('mouseleave', () => {
        homeBlock.style.setProperty('--back-x', '0px');
        homeBlock.style.setProperty('--back-y', '0px');

        homeItems.forEach((item) => {
            item.style.setProperty('--move-x', '0px');
            item.style.setProperty('--move-y', '0px');
        });
    });
}

/*---------------------------------- О нас --------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
    const photoSets = document.querySelectorAll('.about-photos-set');
    const photosMove = document.querySelector('.about-photos-move');

    if (photoSets.length === 0 || !photosMove) {
        return;
    }

    function getPhotoSize() {
        if (window.innerWidth <= 425) {
            return {
                width: 41,
                height: 28
            };
        }

        if (window.innerWidth <= 768) {
            return {
                width: 18,
                height: 18
            };
        }

        return {
            width: 14,
            height: 16
        };
    }

    function isOverlapping(newPhoto, placedPhotos) {
        return placedPhotos.some((photo) => {
            const gap = 4;

            return !(
                newPhoto.left + newPhoto.width + gap < photo.left ||
                newPhoto.left > photo.left + photo.width + gap ||
                newPhoto.top + newPhoto.height + gap < photo.top ||
                newPhoto.top > photo.top + photo.height + gap
            );
        });
    }

    function getRandomPosition(photoSize, placedPhotos) {
        const maxTries = 200;

        for (let i = 0; i < maxTries; i++) {
            const position = {
                left: Math.random() * (100 - photoSize.width),
                top: Math.random() * (105 - photoSize.height),
                width: photoSize.width,
                height: photoSize.height
            };

            if (!isOverlapping(position, placedPhotos)) {
                return position;
            }
        }

        return {
            left: 5,
            top: placedPhotos.length * (photoSize.height + 4),
            width: photoSize.width,
            height: photoSize.height
        };
    }

    function placePhotosRandomly() {
        const photoSize = getPhotoSize();

        photoSets.forEach((set) => {
            const placedPhotos = [];
            const photos = Array.from(set.querySelectorAll('.about-photo'));

            photos.forEach((photo) => {
                const position = getRandomPosition(photoSize, placedPhotos);

                photo.style.width = `${position.width}vw`;
                photo.style.left = `${position.left}%`;
                photo.style.top = `${position.top}%`;

                placedPhotos.push(position);
            });
        });
    }

    placePhotosRandomly();

    photosMove.addEventListener('animationiteration', () => {
        placePhotosRandomly();
    });

    window.addEventListener('resize', () => {
        placePhotosRandomly();
    });
});

/*---------------------------------- Магазин --------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
    const shopBlock = document.querySelector('.shop-start');
    const shopProducts = document.querySelectorAll('.shop-product');

    if (!shopBlock) {
        return;
    }

    shopBlock.addEventListener('mousemove', (event) => {
        const rect = shopBlock.getBoundingClientRect();

        const mouseX = (event.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (event.clientY - rect.top) / rect.height - 0.5;

        shopBlock.style.setProperty('--shop-bg-x', `${mouseX * -24}px`);
        shopBlock.style.setProperty('--shop-bg-y', `${mouseY * -24}px`);

        shopProducts.forEach((product, index) => {
            const move = 4 + index * 1.5;

            product.style.setProperty('--shop-move-x', `${mouseX * move}px`);
            product.style.setProperty('--shop-move-y', `${mouseY * move}px`);
        });
    });

    shopBlock.addEventListener('mouseleave', () => {
        shopBlock.style.setProperty('--shop-bg-x', '0px');
        shopBlock.style.setProperty('--shop-bg-y', '0px');

        shopProducts.forEach((product) => {
            product.style.setProperty('--shop-move-x', '0px');
            product.style.setProperty('--shop-move-y', '0px');
        });
    });
});

/*---------------------------------- блог --------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
    const blogArea = document.querySelector('.blog-area');
    const rocks = Array.from(document.querySelectorAll('.blog-rock'));
    const texts = Array.from(document.querySelectorAll('.blog-text'));

    if (!blogArea || rocks.length === 0) {
        return;
    }

    const desktopLayout = [
        { x: 9, y: 2, w: 14 }, { x: 34, y: 3, w: 5 }, { x: 47, y: 5, w: 4 },
        { x: 38, y: 9, w: 6 }, { x: 25, y: 12, w: 8 }, { x: 5, y: 18, w: 6 },
        { x: 13, y: 24, w: 5 }, { x: 4, y: 28, w: 4 }, { x: 5, y: 31, w: 9 },
        { x: 25, y: 34, w: 5 }, { x: 30, y: 24, w: 12 }, { x: 45, y: 31, w: 9 },
        { x: 83, y: 32, w: 12 }, { x: 66, y: 31, w: 6 }, { x: 84, y: 39, w: 4 },
        { x: 69, y: 41, w: 4 }, { x: 88, y: 45, w: 6 }, { x: 48, y: 48, w: 12 },
        { x: 90, y: 51, w: 5 }, { x: 42, y: 54, w: 7 }, { x: 51, y: 57, w: 4 },
        { x: 43, y: 59, w: 7 }, { x: 12, y: 62, w: 6 }, { x: 22, y: 65, w: 5 },
        { x: 12, y: 60, w: 16 }, { x: 47, y: 63, w: 6 }, { x: 92, y: 66, w: 4 },
        { x: 50, y: 69, w: 6 }, { x: 44, y: 74, w: 5 }, { x: 50, y: 78, w: 6 },
        { x: 92, y: 79, w: 5 }, { x: 8, y: 82, w: 4 }, { x: 17, y: 84, w: 6 },
        { x: 35, y: 87, w: 5 }, { x: 46, y: 88, w: 6 }, { x: 92, y: 88, w: 5 },
        { x: 5, y: 91, w: 6 }, { x: 30, y: 92, w: 6 }, { x: 47, y: 93, w: 5 },
        { x: 59, y: 92, w: 5 }, { x: 72, y: 92, w: 6 }, { x: 88, y: 93, w: 8 }
    ];

    const tabletLayout = [
        { x: 10, y: 3, w: 17 }, { x: 35, y: 3, w: 5 }, { x: 47, y: 6, w: 4 },
        { x: 37, y: 10, w: 6 }, { x: 25, y: 13, w: 8 }, { x: 6, y: 18, w: 6 },
        { x: 13, y: 24, w: 5 }, { x: 45, y: 28, w: 8 }, { x: 6, y: 31, w: 9 },
        { x: 26, y: 35, w: 5 }, { x: 54, y: 32, w: 8 }, { x: 78, y: 33, w: 12 },
        { x: 65, y: 41, w: 5 }, { x: 84, y: 43, w: 6 }, { x: 50, y: 47, w: 11 },
        { x: 72, y: 51, w: 5 }, { x: 43, y: 55, w: 7 }, { x: 56, y: 59, w: 5 },
        { x: 11, y: 61, w: 7 }, { x: 23, y: 65, w: 5 }, { x: 13, y: 68, w: 15 },
        { x: 45, y: 70, w: 5 }, { x: 59, y: 73, w: 6 }, { x: 82, y: 75, w: 5 },
        { x: 9, y: 80, w: 5 }, { x: 17, y: 83, w: 6 }, { x: 35, y: 85, w: 5 },
        { x: 48, y: 87, w: 6 }, { x: 62, y: 89, w: 5 }, { x: 76, y: 90, w: 6 },
        { x: 88, y: 91, w: 8 }
    ];

    const mobileLayout = [
        { x: 18, y: 0, w: 18 }, { x: 58, y: 1, w: 5 }, { x: 4, y: 4, w: 7 },
        { x: 89, y: 5, w: 7 }, { x: -4, y: 9, w: 10 }, { x: 91, y: 13, w: 9 },
        { x: 3, y: 19, w: 7 }, { x: 91, y: 23, w: 9 }, { x: -5, y: 29, w: 12 },
        { x: 88, y: 33, w: 7 }, { x: 1, y: 37, w: 16 }, { x: 91, y: 41, w: 10 },
        { x: 0, y: 47, w: 12 }, { x: 91, y: 50, w: 7 }, { x: 3, y: 54, w: 7 },
        { x: 90, y: 58, w: 9 }, { x: -4, y: 62, w: 11 }, { x: 86, y: 61, w: 16 },
        { x: 2, y: 68, w: 7 }, { x: 91, y: 71, w: 9 }, { x: -4, y: 76, w: 11 },
        { x: 89, y: 79, w: 7 }, { x: 4, y: 83, w: 8 }, { x: 90, y: 86, w: 10 },
        { x: -2, y: 91, w: 15 }, { x: 91, y: 94, w: 6 }
    ];

    const getLayout = () => {
        if (window.innerWidth <= 425) {
            return mobileLayout;
        }

        if (window.innerWidth <= 768) {
            return tabletLayout;
        }

        return desktopLayout;
    };

    const getGap = () => {
        if (window.innerWidth <= 425) {
            return 18;
        }

        if (window.innerWidth <= 768) {
            return 28;
        }

        return 34;
    };

    const getMoveSize = () => {
        if (window.innerWidth <= 425) {
            return 4;
        }

        if (window.innerWidth <= 768) {
            return 5;
        }

        return 6;
    };

    const getRockScale = () => {
        if (window.innerWidth <= 425) {
            return 1.35;
        }

        if (window.innerWidth <= 768) {
            return 1.28;
        }

        return 1.22;
    };

    const getRotateSize = () => {
        if (window.innerWidth <= 425) {
            return 7;
        }

        if (window.innerWidth <= 768) {
            return 8;
        }

        return 9;
    };

    const makeRect = (left, top, width, height) => ({
        left,
        top,
        right: left + width,
        bottom: top + height,
        width,
        height
    });

    const addGap = (rect, gap) => ({
        left: rect.left - gap,
        top: rect.top - gap,
        right: rect.right + gap,
        bottom: rect.bottom + gap
    });

    const isIntersect = (a, b) => (
        a.left < b.right &&
        a.right > b.left &&
        a.top < b.bottom &&
        a.bottom > b.top
    );

    const hasCollision = (rect, rects) => (
        rects.some((item) => isIntersect(rect, item))
    );

    const getTextRects = () => {
        const areaRect = blogArea.getBoundingClientRect();
        const gap = getGap();

        return texts.map((text) => {
            const rect = text.getBoundingClientRect();

            return addGap(makeRect(
                rect.left - areaRect.left,
                rect.top - areaRect.top,
                rect.width,
                rect.height
            ), gap * 1.6);
        });
    };

    const findSafePlace = (left, top, width, height, textRects, placedRects, areaRect) => {
        const gap = getGap();
        const steps = [
            [0, 0], [40, 0], [-40, 0], [0, 40], [0, -40],
            [70, 30], [-70, 30], [70, -30], [-70, -30],
            [110, 0], [-110, 0], [0, 90], [0, -90],
            [130, 70], [-130, 70], [130, -70], [-130, -70]
        ];

        for (const step of steps) {
            const nextLeft = Math.max(-width * 0.15, Math.min(left + step[0], areaRect.width - width * 0.85));
            const nextTop = Math.max(0, Math.min(top + step[1], areaRect.height - height));
            const rect = addGap(makeRect(nextLeft, nextTop, width, height), gap);

            if (!hasCollision(rect, textRects) && !hasCollision(rect, placedRects)) {
                return {
                    left: nextLeft,
                    top: nextTop,
                    hidden: false
                };
            }
        }

        return {
            left,
            top,
            hidden: true
        };
    };

    let rockData = [];

    const placeRocks = () => {
        const areaRect = blogArea.getBoundingClientRect();
        const layout = getLayout();
        const textRects = getTextRects();
        const placedRects = [];
        const moveSize = getMoveSize();
        const rockScale = getRockScale();
        const rotateSize = getRotateSize();

        rockData = rocks.map((rock, index) => {
            const item = layout[index % layout.length];
            const width = areaRect.width * item.w / 100 * rockScale;
            const ratio = rock.naturalWidth > 0 ? rock.naturalHeight / rock.naturalWidth : 1;
            const height = width * ratio;
            const left = areaRect.width * item.x / 100;
            const top = areaRect.height * item.y / 100;
            const place = findSafePlace(left, top, width, height, textRects, placedRects, areaRect);

            rock.style.left = `${place.left}px`;
            rock.style.top = `${place.top}px`;
            rock.style.width = `${width}px`;
            rock.style.opacity = place.hidden ? '0' : '1';
            rock.style.setProperty('--rock-x', '0px');
            rock.style.setProperty('--rock-y', '0px');
            rock.style.setProperty('--rock-rotate', '0deg');

            if (!place.hidden) {
                placedRects.push(addGap(makeRect(place.left, place.top, width, height), getGap()));
            }

            return {
                rock,
                hidden: place.hidden,
                left: place.left,
                top: place.top,
                width,
                height,
                phase: Math.random() * Math.PI * 2,
                speed: 0.00018 + Math.random() * 0.00014,
                moveX: moveSize,
                moveY: moveSize,
                rotate: rotateSize + Math.random() * 2
            };
        });
    };

    const animateRocks = (time) => {
        const textRects = getTextRects();
        const frameRects = [];

        rockData.forEach((item) => {
            if (item.hidden) {
                return;
            }

            const wave = Math.sin(time * item.speed + item.phase);
            const secondWave = Math.cos(time * item.speed * 0.75 + item.phase);
            let moveX = wave * item.moveX;
            let moveY = secondWave * item.moveY;
            let rotate = wave * item.rotate;

            let nextRect = addGap(makeRect(
                item.left + moveX,
                item.top + moveY,
                item.width,
                item.height
            ), getGap());

            if (hasCollision(nextRect, textRects) || hasCollision(nextRect, frameRects)) {
                moveX = 0;
                moveY = 0;
                rotate = 0;

                nextRect = addGap(makeRect(
                    item.left,
                    item.top,
                    item.width,
                    item.height
                ), getGap());
            }

            item.rock.style.setProperty('--rock-x', `${moveX}px`);
            item.rock.style.setProperty('--rock-y', `${moveY}px`);
            item.rock.style.setProperty('--rock-rotate', `${rotate}deg`);

            frameRects.push(nextRect);
        });

        requestAnimationFrame(animateRocks);
    };

    const imagePromises = rocks.map((rock) => {
        if (rock.complete) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            rock.addEventListener('load', resolve, { once: true });
            rock.addEventListener('error', resolve, { once: true });
        });
    });

    Promise.all(imagePromises).then(() => {
        placeRocks();
        requestAnimationFrame(animateRocks);
    });

    let resizeTimer;

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            placeRocks();
        }, 150);
    });
});

/*---------------------------------- коллаборации --------------------------------------*/

document.addEventListener("DOMContentLoaded", function () {
    const calabSection = document.querySelector(".calab-start");

    if (!calabSection) {
        return;
    }

    const calabCards = Array.from(document.querySelectorAll("[data-calab-card]"));
    const calabPoints = Array.from(document.querySelectorAll("[data-calab-point] b"));
    const calabLines = Array.from(document.querySelectorAll(".calab-line"));
    const calabCenter = document.querySelector(".calab-center");

    function randomCalabNumber() {
        const first = Math.floor(Math.random() * 80) + 10;
        const second = Math.floor(Math.random() * 9000) + 1000;

        return first + "." + second;
    }

    function updateCalabNumbers() {
        calabPoints.forEach(function (point) {
            point.textContent = randomCalabNumber();
        });
    }

    function moveCalabCards() {
        if (window.innerWidth <= 425) {
            calabCards.forEach(function (card) {
                card.style.setProperty("--calab-x", "0px");
                card.style.setProperty("--calab-y", "0px");
            });

            return;
        }

        calabCards.forEach(function (card, index) {
            const radius = window.innerWidth <= 768 ? 8 : 14;
            const time = Date.now() / 1200;
            const x = Math.sin(time + index * 2.0) * radius;
            const y = Math.cos(time + index * 1.0) * radius;

            card.style.setProperty("--calab-x", x.toFixed(2) + "px");
            card.style.setProperty("--calab-y", y.toFixed(2) + "px");
        });
    }

    function updateCalabLines() {
        if (window.innerWidth <= 425 || !calabCenter) {
            return;
        }

        const sectionRect = calabSection.getBoundingClientRect();
        const centerX = sectionRect.width / 2;
        const centerY = sectionRect.height / 2;

        calabCenter.setAttribute("cx", centerX);
        calabCenter.setAttribute("cy", centerY);

        calabCards.forEach(function (card, index) {
            const point = card.querySelector(".calab-point span");
            const line = calabLines[index];

            if (!point || !line) {
                return;
            }

            const pointRect = point.getBoundingClientRect();
            const pointX = pointRect.left + pointRect.width / 2 - sectionRect.left;
            const pointY = pointRect.top + pointRect.height / 2 - sectionRect.top;

            line.setAttribute("x1", centerX);
            line.setAttribute("y1", centerY);
            line.setAttribute("x2", pointX);
            line.setAttribute("y2", pointY);
        });
    }

    function animateCalab() {
        moveCalabCards();
        updateCalabLines();
        requestAnimationFrame(animateCalab);
    }

    calabCards.forEach(function (card) {
        card.addEventListener("mouseenter", updateCalabNumbers);
        card.addEventListener("touchstart", updateCalabNumbers);
    });

    updateCalabNumbers();
    setInterval(updateCalabNumbers, 200);
    animateCalab();

    window.addEventListener("resize", updateCalabLines);
});

/*---------------------------------- магазин --------------------------------------*/

document.addEventListener("DOMContentLoaded", function () {
    const openButtons = document.querySelectorAll("[data-shop-modal-open]");
    const modals = document.querySelectorAll("[data-shop-modal]");

    if (!openButtons.length || !modals.length) {
        return;
    }

    function closeAllModals() {
        modals.forEach(function (modal) {
            modal.classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");
        });

        document.body.classList.remove("shop-modal-lock");
    }

    function openModal(modalName) {
        const modal = document.querySelector('[data-shop-modal="' + modalName + '"]');

        if (!modal) {
            return;
        }

        closeAllModals();

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("shop-modal-lock");

        const countText = modal.querySelector("[data-shop-count]");

        if (countText) {
            countText.textContent = "1";
        }
    }

    openButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            openModal(button.dataset.shopModalOpen);
        });
    });

    modals.forEach(function (modal) {
        const closeButtons = modal.querySelectorAll("[data-shop-modal-close]");
        const minusButton = modal.querySelector("[data-shop-minus]");
        const plusButton = modal.querySelector("[data-shop-plus]");
        const countText = modal.querySelector("[data-shop-count]");

        closeButtons.forEach(function (button) {
            button.addEventListener("click", closeAllModals);
        });

        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeAllModals();
            }
        });

        if (minusButton && plusButton && countText) {
            minusButton.addEventListener("click", function () {
                const currentCount = Number(countText.textContent);
                countText.textContent = Math.max(1, currentCount - 1);
            });

            plusButton.addEventListener("click", function () {
                const currentCount = Number(countText.textContent);
                countText.textContent = currentCount + 1;
            });
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });
});