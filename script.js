        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        let gameStarted = false;
        let score = 0;
        let lives = 3.0;
        let gameRunning = true;
        function startGame() {
            document.getElementById('startScreen').classList.add('hidden');
            canvas.style.display = 'block';
            gameStarted = true;
            gameRunning = true;
            score = 0;
            lives = 3;
            obstacles = [];
            coins = [];
            particles = [];
            document.getElementById('score').textContent = score;
            document.getElementById('lives').textContent = lives;
        }

        const player = {
            x: 50,
            y: canvas.height / 2 - 25,
            width: 45,
            height: 45,
            speed: 10,
            dy: 0,
            dx: 0,  // Kecepatan horizontal
            
            draw: function() {
                // Simpan context untuk transformasi
                ctx.save();
                
                // Buat gradient untuk body
                const gradient = ctx.createRadialGradient(
                    this.x + this.width/2, this.y + this.height/2, 0,
                    this.x + this.width/2, this.y + this.height/2, this.width/2
                );
                gradient.addColorStop(0, '#8B4513');  // Coklat tengah
                gradient.addColorStop(1, '#654321');  // Coklat gelap pinggir
                
                // Gambar body bulat
                ctx.beginPath();
                ctx.arc(this.x + this.width/2, this.y + this.height/2, 
                       this.width/2, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Mata
                ctx.fillStyle = '#000';
                // Mata kiri
                ctx.beginPath();
                ctx.arc(this.x + this.width/2 - 8, this.y + this.height/2 - 5, 
                       4, 0, Math.PI * 2);
                ctx.fill();
                // Mata kanan
                ctx.beginPath();
                ctx.arc(this.x + this.width/2 + 8, this.y + this.height/2 - 5, 
                       4, 0, Math.PI * 2);
                ctx.fill();
                
                // Putih mata
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(this.x + this.width/2 - 9, this.y + this.height/2 - 6, 
                       1.5, 0, Math.PI * 2);
                ctx.arc(this.x + this.width/2 + 7, this.y + this.height/2 - 6, 
                       1.5, 0, Math.PI * 2);
                ctx.fill();
                
                // Mulut tersenyum
                ctx.beginPath();
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 2;
                ctx.arc(this.x + this.width/2, this.y + this.height/2 + 5, 
                       8, 0.2, Math.PI - 0.2);
                ctx.stroke();
                
                // Restore context
                ctx.restore();
            },
            
            update: function() {
                this.y += this.dy;
                this.x += this.dx;
                
                // Batasan vertikal
                if (this.y < 0) this.y = 0;
                if (this.y + this.height > canvas.height) {
                    this.y = canvas.height - this.height;
                }
                
                // Batasan horizontal
                if (this.x < 0) this.x = 0;
                if (this.x + this.width > canvas.width) {
                    this.x = canvas.width - this.width;
                }
            }
        };

        let obstacles = [];
        let obstacleSpawnRate = 30;

        class Obstacle {
            constructor() {
                this.width = 50;  // Ikan lebih panjang
                this.height = 30;  // Tapi tidak terlalu tinggi
                this.x = canvas.width;
                this.y = Math.random() * (canvas.height - this.height);
                // Base speed + bonus dari skor
                let speedBonus = Math.floor(score / 1000) * 2;  // Tambah 2 kecepatan setiap 1000 skor
                this.speed = (7 + Math.random() * 3) + speedBonus;
                this.collected = false;
                this.tailWag = 0;  // Untuk animasi ekor
                this.tailSpeed = 0.1;  // Kecepatan goyangan ekor
            }

            draw() {
                ctx.save();
                
                // Animasi ekor
                this.tailWag += this.tailSpeed;
                
                // Badan ikan (oval)
                ctx.beginPath();
                ctx.fillStyle = '#4169E1';  // Biru royal
                ctx.ellipse(
                    this.x + this.width * 0.3, 
                    this.y + this.height/2,
                    this.width * 0.3,  // radius X
                    this.height/2,     // radius Y
                    0, 0, Math.PI * 2
                );
                ctx.fill();

                // Ekor ikan (bergerak)
                ctx.beginPath();
                ctx.moveTo(this.x + this.width * 0.5, this.y + this.height/2);
                ctx.lineTo(
                    this.x + this.width,
                    this.y + this.height/2 + Math.sin(this.tailWag) * 10
                );
                ctx.lineTo(this.x + this.width * 0.5, this.y + this.height);
                ctx.fillStyle = '#4169E1';
                ctx.fill();

                // Mata
                ctx.beginPath();
                ctx.fillStyle = 'white';
                ctx.arc(
                    this.x + this.width * 0.2,
                    this.y + this.height * 0.4,
                    4, 0, Math.PI * 2
                );
                ctx.fill();
                
                // Pupil
                ctx.beginPath();
                ctx.fillStyle = 'black';
                ctx.arc(
                    this.x + this.width * 0.2,
                    this.y + this.height * 0.4,
                    2, 0, Math.PI * 2
                );
                ctx.fill();

                // Sirip atas
                ctx.beginPath();
                ctx.moveTo(this.x + this.width * 0.3, this.y);
                ctx.quadraticCurveTo(
                    this.x + this.width * 0.4,
                    this.y - this.height * 0.3,
                    this.x + this.width * 0.5,
                    this.y + this.height * 0.2
                );
                ctx.fillStyle = '#4169E1';
                ctx.fill();

                // Sirip bawah
                ctx.beginPath();
                ctx.moveTo(this.x + this.width * 0.3, this.y + this.height);
                ctx.quadraticCurveTo(
                    this.x + this.width * 0.4,
                    this.y + this.height * 1.3,
                    this.x + this.width * 0.5,
                    this.y + this.height * 0.8
                );
                ctx.fillStyle = '#4169E1';
                ctx.fill();

                ctx.restore();
            }
            
            update() {
                this.x -= this.speed;
            }
            
            isOffScreen() {
                return this.x + this.width < 0;
            }
        }

        let coins = [];
        let coinSpawnRate = 200;

        class Coin {
            constructor() {
                this.radius = 8;
                this.x = canvas.width;
                this.y = Math.random() * (canvas.height - this.radius * 2);
                this.speed = 2;
                this.rotation = 0;
            }
            
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                
                ctx.fillStyle = '#ffd700';
                ctx.beginPath();
                ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.strokeStyle = '#ffaa00';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.beginPath();
                ctx.arc(-3, -3, 3, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            }
            
            update() {
                this.x -= this.speed;
                this.rotation += 0.05;
            }
            
            isOffScreen() {
                return this.x - this.radius < 0;
            }
        }

        function checkCollision(rect1, rect2) {
            return rect1.x < rect2.x + rect2.width &&
                   rect1.x + rect1.width > rect2.x &&
                   rect1.y < rect2.y + rect2.height &&
                   rect1.y + rect1.height > rect2.y;
        }

        let particles = [];

        class Particle {
            constructor(x, y, color, vx, vy) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.vx = vx;
                this.vy = vy;
                this.life = 1;
                this.decay = 0.02;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += 0.1;
                this.life -= this.decay;
            }
            
            draw() {
                ctx.globalAlpha = this.life;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        function update() {
            player.update();
            
            obstacleSpawnRate--;
            if (obstacleSpawnRate <= 0) {
                obstacles.push(new Obstacle());
                obstacleSpawnRate = 60;
            }
            
            for (let i = obstacles.length - 1; i >= 0; i--) {
                obstacles[i].update();
                
                if (checkCollision(player, obstacles[i])) {
                    lives -= 0.5; // Kurangi setengah nyawa
                    
                    for (let j = 0; j < 10; j++) {
                        const angle = (Math.PI * 2 * j) / 10;
                        particles.push(new Particle(
                            player.x + player.width / 2,
                            player.y + player.height / 2,
                            '#ff4444',
                            Math.cos(angle) * 3,
                            Math.sin(angle) * 3
                        ));
                    }
                    
                    obstacles.splice(i, 1);
                    
                    if (lives <= 0) {
                        gameRunning = false;
                        showGameOver();
                    }
                } else if (obstacles[i].isOffScreen()) {
                    obstacles.splice(i, 1);
                    score += 10;
                }
            }
            
            coinSpawnRate--;
            if (coinSpawnRate <= 0) {
                coins.push(new Coin());
                coinSpawnRate = 200;
            }
            
            for (let i = coins.length - 1; i >= 0; i--) {
                coins[i].update();
                
                if (checkCollision(player, {
                    x: coins[i].x - coins[i].radius,
                    y: coins[i].y - coins[i].radius,
                    width: coins[i].radius * 2,
                    height: coins[i].radius * 2
                })) {
                    score += 50;
                    
                    for (let j = 0; j < 15; j++) {
                        const angle = (Math.PI * 2 * j) / 15;
                        particles.push(new Particle(
                            coins[i].x,
                            coins[i].y,
                            '#ffd700',
                            Math.cos(angle) * 2,
                            Math.sin(angle) * 2
                        ));
                    }
                    
                    coins.splice(i, 1);
                } else if (coins[i].isOffScreen()) {
                    coins.splice(i, 1);
                }
            }
            
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                if (particles[i].life <= 0) {
                    particles.splice(i, 1);
                }
            }
            
            document.getElementById('score').textContent = score;
            document.getElementById('lives').textContent = lives;
        }

        function draw() {
            ctx.fillStyle = 'rgba(135, 206, 235, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.strokeStyle = 'rgba(200, 220, 240, 0.3)';
            ctx.lineWidth = 1;
            for (let i = 0; i < canvas.width; i += 50) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
            }
            
            obstacles.forEach(obstacle => obstacle.draw());
            coins.forEach(coin => coin.draw());
            particles.forEach(particle => particle.draw());
            
            player.draw();
            
            // Score
            ctx.fillStyle = '#333';
            ctx.font = 'bold 16px Arial';
            ctx.fillText(`Skor: ${score}`, 20, 30);

            // Draw hearts for lives
            let heartSize = 20;
            let startX = 20;
            let startY = 45;
            let hasHalfHeart = lives % 1 !== 0; // Check if we have a half heart
            let fullHearts = Math.floor(lives);

            // Function to draw a heart
            function drawHeart(x, y, size, filled) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x + size/2, y + size);
                ctx.bezierCurveTo(x + size/2, y + size, 
                                x + size, y + size/1.5, 
                                x + size, y + size/3);
                ctx.bezierCurveTo(x + size, y, 
                                x + size/2, y, 
                                x + size/2, y + size/3);
                ctx.bezierCurveTo(x + size/2, y, 
                                x, y, 
                                x, y + size/3);
                ctx.bezierCurveTo(x, y + size/1.5, 
                                x + size/2, y + size, 
                                x + size/2, y + size);
                
                if (filled) {
                    ctx.fillStyle = '#FF3366';
                    ctx.fill();
                } else {
                    // For half heart, clip and fill only left side
                    ctx.clip();
                    ctx.fillStyle = '#FF3366';
                    ctx.fillRect(x, y, size/2, size);
                }
                
                // Heart outline
                ctx.strokeStyle = '#CC0033';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
            }

            // Draw full hearts
            for (let i = 0; i < fullHearts; i++) {
                drawHeart(startX + (heartSize + 5) * i, startY, heartSize, true);
            }

            // Draw half heart if needed
            if (hasHalfHeart) {
                drawHeart(startX + (heartSize + 5) * fullHearts, startY, heartSize, false);
            }
        }

        function gameLoop() {
            if (gameStarted && gameRunning) {
                update();
                draw();
            }
            requestAnimationFrame(gameLoop);
        }

        // Objek untuk melacak status tombol
        const keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false
        };

        window.addEventListener('keydown', (e) => {
            // Mencegah default behavior seperti scroll
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }
            
            // Update status tombol
            if (e.key in keys) {
                keys[e.key] = true;
            }
            
            // Update pergerakan vertikal
            if (keys.ArrowUp) {
                player.dy = -player.speed;
            } else if (keys.ArrowDown) {
                player.dy = player.speed;
            }
            
            // Update pergerakan horizontal
            if (keys.ArrowLeft) {
                player.dx = -player.speed;
            } else if (keys.ArrowRight) {
                player.dx = player.speed;
            }
        });

        window.addEventListener('keyup', (e) => {
            // Update status tombol
            if (e.key in keys) {
                keys[e.key] = false;
            }
            
            // Vertikal movement
            if (!keys.ArrowUp && !keys.ArrowDown) {
                player.dy = 0;
            } else if (keys.ArrowUp) {
                player.dy = -player.speed;
            } else if (keys.ArrowDown) {
                player.dy = player.speed;
            }
            
            // Horizontal movement
            if (!keys.ArrowLeft && !keys.ArrowRight) {
                player.dx = 0;
            } else if (keys.ArrowLeft) {
                player.dx = -player.speed;
            } else if (keys.ArrowRight) {
                player.dx = player.speed;
            }
        });

        function showGameOver() {
            document.getElementById('gameOverScreen').classList.remove('hidden');
            document.getElementById('finalScore').textContent = `Skor Akhir: ${score}`;
        }

        gameLoop();