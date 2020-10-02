describe('Battleship Test', () => {
    context('responsive', () => {
        beforeEach(() => {
            cy.viewport('iphone-6');
        });

        it('Opens the welcome page', () => {
            cy.visit('/');
            cy.contains('Welcome to the Battleship!');
            cy.wait(2000);
        });

        // it('Shows the opponent fleet', () => {
        //     cy.visit('/');
        //     cy.contains('Create new game').click();

        //     cy.wait(2000);

        //     cy.contains('Voir la flotte Adverse').click();
        //     cy.get('.ship').should('not.exist');
        //     cy.wait(2000);
        // });

        it('Plays a complete game', () => {
            let game;
            let player1;
            let player2;
            let currentPlayer;

            cy.request(
                'POST',
                `${Cypress.env('api_server')}/games?mode=demo`
            ).then(response => {
                game = response.body.game_hash;
                player1 = response.body.player_hash;
                currentPlayer = player1;

                cy.request(
                    'PUT',
                    `${Cypress.env('api_server')}/games/${game}/join?mode=demo`
                ).then(response => {
                    player2 = response.body.player_hash;

                    cy.request(
                        'GET',
                        `${Cypress.env(
                            'api_server'
                        )}/games/${game}?player_hash=${player2}`
                    ).then(response => {
                        cy.visit(`/games/${game}?player_hash=${player1}`);
                        cy.wait(2000);

                        shoot(16);
                        switchPlayer();
                        shoot(22);
                        switchPlayer();
                        shoot(32);
                        shoot(33);
                        switchPlayer();
                        shoot(34);
                        switchPlayer();
                        shoot(31);
                        switchPlayer();
                        shoot(42);
                        switchPlayer();
                        shoot(42);
                        shoot(52);
                        shoot(12);
                        shoot(13);
                        shoot(14);
                        shoot(15);
                        switchPlayer();
                        shoot(50);
                        switchPlayer();
                        shoot(70);
                        shoot(71);
                        switchPlayer();
                        shoot(11);
                        switchPlayer();
                        shoot(80);
                        shoot(90);
                        shoot(66);
                        switchPlayer();
                        shoot(15);
                        shoot(16);
                        shoot(37);
                        switchPlayer();
                        shoot(11);
                        shoot(38);
                        shoot(48);
                        switchPlayer();
                        shoot(55);
                        switchPlayer();
                        shoot(28);
                        switchPlayer();
                        shoot(62);
                        shoot(72);
                        switchPlayer();
                        shoot(55);
                        switchPlayer();
                        shoot(63);
                        shoot(64);
                        shoot(66);
                        switchPlayer();
                        shoot(39);
                        shoot(37);
                        shoot(36);
                        shoot(35);
                        shoot(85);
                        switchPlayer();
                        shoot(65);
                        shoot(61);
                        shoot(78);
                        switchPlayer();
                        shoot(76);
                        switchPlayer();
                        shoot(31);
                        switchPlayer();
                        shoot(67);
                        switchPlayer();
                        shoot(20);
                        shoot(30);
                        shoot(41);
                        switchPlayer();
                        shoot(74);
                        switchPlayer();
                        shoot(40);
                        switchPlayer();
                        shoot(83);
                        shoot(84);
                    });
                });
            });

            function switchPlayer() {
                currentPlayer = currentPlayer === player1 ? player2 : player1;

                cy.visit(`/games/${game}?player_hash=${currentPlayer}`);
            }

            function shoot(position) {
                cy.get('.shooting-grid').children().eq(position).click();
                cy.wait(6000);
            }
        });
    });
});
