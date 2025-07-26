-- Seed data for 1978-1979 Topps Baseball Card Collection
-- This script populates the database with players from the 1978 Topps set

-- Insert players from the 1978 Topps set
INSERT INTO players (name, position, years_active, decade, description) VALUES
-- First 50 players from the current collection
('Lou Brock', 'Left Field', '1961-1979', '1970s', 'Hall of Fame outfielder and stolen base legend'),
('Sparky Lyle', 'Pitcher', '1967-1982', '1970s', '1977 AL Cy Young Award winner and relief pitcher'),
('Willie McCovey', 'First Base', '1959-1980', '1970s', 'Hall of Fame first baseman and 1969 NL MVP'),
('Brooks Robinson', 'Third Base', '1955-1977', '1970s', 'Hall of Fame third baseman and 16-time Gold Glove winner'),
('Pete Rose', 'First Base', '1963-1986', '1970s', 'All-time hits leader and 1973 NL MVP'),
('Nolan Ryan', 'Pitcher', '1966-1993', '1970s', 'Hall of Fame pitcher and strikeout king'),
('Reggie Jackson', 'Right Field', '1967-1987', '1970s', 'Hall of Fame outfielder and Mr. October'),
('Mike Sadek', 'Catcher', '1973-1981', '1970s', 'Backup catcher for the San Francisco Giants'),
('Doug DeCinces', 'Third Base', '1973-1987', '1970s', 'Three-time All-Star and Gold Glove winner'),
('Rick Manning', 'Center Field', '1975-1987', '1970s', '1976 AL Rookie of the Year runner-up'),
('Don Aase', 'Pitcher', '1977-1990', '1970s', '1986 All-Star and relief pitcher'),
('Art Howe', 'Third Base', '1974-1985', '1970s', 'Future manager and utility infielder'),
('Lerrin LaGrow', 'Pitcher', '1970-1980', '1970s', 'Relief pitcher and 1977 All-Star'),
('Tony Perez', 'First Base', '1964-1986', '1970s', 'Hall of Fame first baseman and Big Red Machine member'),
('Roy White', 'Left Field', '1965-1979', '1970s', 'Two-time World Series champion with Yankees'),
('Mike Krukow', 'Pitcher', '1976-1989', '1970s', '1986 All-Star and future broadcaster'),
('Bobby Grich', 'Second Base', '1970-1986', '1970s', 'Six-time All-Star and four-time Gold Glove winner'),
('Darrell Porter', 'Catcher', '1971-1987', '1970s', 'Four-time All-Star and 1982 World Series MVP'),
('Steve Kemp', 'Left Field', '1977-1988', '1970s', '1979 All-Star and 1980 Silver Slugger'),
('Charlie Hough', 'Pitcher', '1970-1994', '1970s', 'Knuckleball pitcher and 1986 All-Star'),
('Bump Wills', 'Second Base', '1977-1982', '1970s', 'Son of Maury Wills and 1977 AL Rookie of the Year runner-up'),
('Don Money', 'Third Base', '1968-1983', '1970s', 'Four-time All-Star and utility infielder'),
('Jon Matlack', 'Pitcher', '1971-1983', '1970s', '1972 NL Rookie of the Year and three-time All-Star'),
('Richie Hebner', 'Third Base', '1968-1985', '1970s', '1971 World Series champion with Pirates'),
('Geoff Zahn', 'Pitcher', '1973-1985', '1970s', '1984 All-Star and left-handed pitcher'),
('Ed Ott', 'Catcher', '1974-1981', '1970s', '1979 World Series champion with Pirates'),
('Bob Lacey', 'Pitcher', '1977-1984', '1970s', 'Relief pitcher and left-handed specialist'),
('George Hendrick', 'Right Field', '1971-1988', '1970s', 'Four-time All-Star and 1982 World Series champion'),
('Glenn Abbott', 'Pitcher', '1973-1984', '1970s', 'Right-handed pitcher and 1974 World Series champion'),
('Garry Templeton', 'Shortstop', '1976-1991', '1970s', 'Three-time All-Star and switch-hitting shortstop'),
('Dave Lemanczyk', 'Pitcher', '1973-1980', '1970s', 'Right-handed pitcher and Blue Jays original'),
('Phil Niekro', 'Pitcher', '1964-1987', '1970s', 'Hall of Fame knuckleball pitcher and 300-game winner'),
('Dick Pole', 'Pitcher', '1973-1978', '1970s', 'Pitcher for the Seattle Mariners');

-- Insert cards for the 1978 Topps set
INSERT INTO cards (player_id, set_id, card_number, team, image_url, stats_json, notes) VALUES
-- 1978 Topps cards (set_id = 1)
(1, 1, 1, 'St. Louis Cardinals', '/images/players/lou-brock.jpg', '{"stolen_bases": 938, "hits": 3023, "batting_average": 0.293}', '77 Record Breaker Card'),
(2, 1, 2, 'New York Yankees', '/images/players/sparky-lyle.jpg', '{"wins": 99, "saves": 238, "era": 2.88}', '77 Record Breaker Card'),
(3, 1, 3, 'San Francisco Giants', '/images/players/willie-mccovey.jpg', '{"home_runs": 521, "hits": 2211, "batting_average": 0.27}', '77 Record Breaker Card'),
(4, 1, 4, 'Baltimore Orioles', '/images/players/lou-brock.jpg', '{"hits": 2848, "home_runs": 268, "batting_average": 0.267}', '77 Record Breaker Card'),
(5, 1, 5, 'Cincinnati Reds', '/images/players/pete-rose.jpg', '{"hits": 4256, "batting_average": 0.303, "games": 3562}', '77 Record Breaker Card'),
(6, 1, 6, 'California Angels', '/images/players/nolan-ryan.jpg', '{"wins": 324, "strikeouts": 5714, "era": 3.19}', '77 Record Breaker Card'),
(7, 1, 7, 'New York Yankees', '/images/players/reggie-jackson.jpg', '{"home_runs": 563, "hits": 2584, "batting_average": 0.262}', '77 Record Breaker Card'),
(8, 1, 8, 'San Francisco Giants', '/images/players/mike-sadek.jpg', '{"hits": 156, "home_runs": 2, "batting_average": 0.218}', NULL),
(9, 1, 9, 'Baltimore Orioles', '/images/players/doug-decinces.jpg', '{"home_runs": 237, "hits": 1547, "batting_average": 0.259}', NULL),
(10, 1, 10, 'Cleveland Indians', '/images/players/rick-manning.jpg', '{"hits": 1498, "stolen_bases": 195, "batting_average": 0.257}', NULL),
(11, 1, 11, 'California Angels', '/images/players/don-aase.jpg', '{"wins": 66, "saves": 82, "era": 3.80}', NULL),
(12, 1, 12, 'Pittsburgh Pirates', '/images/players/art-howe.jpg', '{"hits": 587, "home_runs": 43, "batting_average": 0.260}', 'Rookie Card'),
(13, 1, 13, 'Chicago White Sox', '/images/players/lerrin-lagrow.jpg', '{"wins": 35, "saves": 64, "era": 3.35}', NULL),
(14, 1, 14, 'Montreal Expos', '/images/players/tony-perez.jpg', '{"home_runs": 379, "hits": 2732, "rbi": 1652}', NULL),
(15, 1, 15, 'New York Yankees', '/images/players/roy-white.jpg', '{"hits": 1803, "home_runs": 160, "batting_average": 0.271}', NULL),
(16, 1, 16, 'Chicago Cubs', '/images/players/mike-krukow.jpg', '{"wins": 124, "strikeouts": 1087, "era": 3.90}', NULL),
(17, 1, 17, 'California Angels', '/images/players/bobby-grich.jpg', '{"hits": 1833, "home_runs": 224, "batting_average": 0.266}', NULL),
(18, 1, 18, 'Kansas City Royals', '/images/players/darrell-porter.jpg', '{"hits": 1203, "home_runs": 188, "batting_average": 0.247}', NULL),
(19, 1, 19, 'Detroit Tigers', '/images/players/steve-kemp.jpg', '{"hits": 1239, "home_runs": 130, "batting_average": 0.278}', NULL),
(20, 1, 20, 'Los Angeles Dodgers', '/images/players/charlie-hough.jpg', '{"wins": 216, "strikeouts": 2362, "era": 3.75}', NULL),
(21, 1, 21, 'Texas Rangers', '/images/players/bump-wills.jpg', '{"hits": 708, "stolen_bases": 196, "batting_average": 0.27}', NULL),
(22, 1, 22, 'Milwaukee Brewers', '/images/players/don-money.jpg', '{"hits": 1476, "home_runs": 176, "batting_average": 0.263}', NULL),
(23, 1, 23, 'New York Mets', '/images/players/jon-matlack.jpg', '{"wins": 125, "strikeouts": 1516, "era": 3.18}', NULL),
(24, 1, 24, 'Philadelphia Phillies', '/images/players/richie-hebner.jpg', '{"hits": 1691, "home_runs": 203, "batting_average": 0.277}', NULL),
(25, 1, 25, 'Chicago Cubs', '/images/players/geoff-zahn.jpg', '{"wins": 111, "strikeouts": 713, "era": 3.74}', NULL),
(26, 1, 26, 'Pittsburgh Pirates', '/images/players/ed-ott.jpg', '{"hits": 425, "home_runs": 33, "batting_average": 0.259}', NULL),
(27, 1, 27, 'Oakland Athletics', '/images/players/bob-lacey.jpg', '{"wins": 15, "saves": 20, "era": 4.13}', NULL),
(28, 1, 28, 'San Diego Padres', '/images/players/george-hendrick.jpg', '{"hits": 1961, "home_runs": 267, "batting_average": 0.278}', NULL),
(29, 1, 29, 'Oakland Athletics', '/images/players/glenn-abbott.jpg', '{"wins": 62, "strikeouts": 471, "era": 4.39}', NULL),
(30, 1, 30, 'St. Louis Cardinals', '/images/players/garry-templeton.jpg', '{"hits": 2126, "stolen_bases": 416, "batting_average": 0.271}', NULL),
(31, 1, 31, 'Toronto Blue Jays', '/images/players/dave-lemanczyk.jpg', '{"wins": 31, "strikeouts": 332, "era": 4.6}', NULL),
(32, 1, 32, 'Atlanta Braves', '/images/players/phil-niekro.jpg', '{"wins": 318, "strikeouts": 3342, "era": 3.35}', NULL),
(33, 1, 33, 'Seattle Mariners', '/images/players/dick-pole.jpg', '{"wins": 19, "losses": 25, "era": 4.65, "strikeouts": 156}', NULL);

-- Insert career stats for players
INSERT INTO player_stats (player_id, stat_type, stat_name, stat_value) VALUES
-- Lou Brock
(1, 'career', 'hits', 3023),
(1, 'career', 'stolen_bases', 938),
(1, 'career', 'batting_average', 0.293),
-- Sparky Lyle
(2, 'career', 'wins', 99),
(2, 'career', 'saves', 238),
(2, 'career', 'era', 2.88),
-- Willie McCovey
(3, 'career', 'home_runs', 521),
(3, 'career', 'hits', 2211),
(3, 'career', 'batting_average', 0.27),
-- Brooks Robinson
(4, 'career', 'hits', 2848),
(4, 'career', 'home_runs', 268),
(4, 'career', 'batting_average', 0.267),
-- Pete Rose
(5, 'career', 'hits', 4256),
(5, 'career', 'batting_average', 0.303),
(5, 'career', 'games', 3562),
-- Nolan Ryan
(6, 'career', 'wins', 324),
(6, 'career', 'strikeouts', 5714),
(6, 'career', 'era', 3.19),
-- Reggie Jackson
(7, 'career', 'home_runs', 563),
(7, 'career', 'hits', 2584),
(7, 'career', 'batting_average', 0.262),
-- Mike Sadek
(8, 'career', 'hits', 156),
(8, 'career', 'home_runs', 2),
(8, 'career', 'batting_average', 0.218),
-- Doug DeCinces
(9, 'career', 'home_runs', 237),
(9, 'career', 'hits', 1547),
(9, 'career', 'batting_average', 0.259),
-- Rick Manning
(10, 'career', 'hits', 1498),
(10, 'career', 'stolen_bases', 195),
(10, 'career', 'batting_average', 0.257),
-- Don Aase
(11, 'career', 'wins', 66),
(11, 'career', 'saves', 82),
(11, 'career', 'era', 3.80),
-- Art Howe
(12, 'career', 'hits', 587),
(12, 'career', 'home_runs', 43),
(12, 'career', 'batting_average', 0.260),
-- Lerrin LaGrow
(13, 'career', 'wins', 35),
(13, 'career', 'saves', 64),
(13, 'career', 'era', 3.35),
-- Tony Perez
(14, 'career', 'home_runs', 379),
(14, 'career', 'hits', 2732),
(14, 'career', 'rbi', 1652),
-- Roy White
(15, 'career', 'hits', 1803),
(15, 'career', 'home_runs', 160),
(15, 'career', 'batting_average', 0.271),
-- Mike Krukow
(16, 'career', 'wins', 124),
(16, 'career', 'strikeouts', 1087),
(16, 'career', 'era', 3.90),
-- Bobby Grich
(17, 'career', 'hits', 1833),
(17, 'career', 'home_runs', 224),
(17, 'career', 'batting_average', 0.266),
-- Darrell Porter
(18, 'career', 'hits', 1203),
(18, 'career', 'home_runs', 188),
(18, 'career', 'batting_average', 0.247),
-- Steve Kemp
(19, 'career', 'hits', 1239),
(19, 'career', 'home_runs', 130),
(19, 'career', 'batting_average', 0.278),
-- Charlie Hough
(20, 'career', 'wins', 216),
(20, 'career', 'strikeouts', 2362),
(20, 'career', 'era', 3.75),
-- Bump Wills
(21, 'career', 'hits', 708),
(21, 'career', 'stolen_bases', 196),
(21, 'career', 'batting_average', 0.27),
-- Don Money
(22, 'career', 'hits', 1476),
(22, 'career', 'home_runs', 176),
(22, 'career', 'batting_average', 0.263),
-- Jon Matlack
(23, 'career', 'wins', 125),
(23, 'career', 'strikeouts', 1516),
(23, 'career', 'era', 3.18),
-- Richie Hebner
(24, 'career', 'hits', 1691),
(24, 'career', 'home_runs', 203),
(24, 'career', 'batting_average', 0.277),
-- Geoff Zahn
(25, 'career', 'wins', 111),
(25, 'career', 'strikeouts', 713),
(25, 'career', 'era', 3.74),
-- Ed Ott
(26, 'career', 'hits', 425),
(26, 'career', 'home_runs', 33),
(26, 'career', 'batting_average', 0.259),
-- Bob Lacey
(27, 'career', 'wins', 15),
(27, 'career', 'saves', 20),
(27, 'career', 'era', 4.13),
-- George Hendrick
(28, 'career', 'hits', 1961),
(28, 'career', 'home_runs', 267),
(28, 'career', 'batting_average', 0.278),
-- Glenn Abbott
(29, 'career', 'wins', 62),
(29, 'career', 'strikeouts', 471),
(29, 'career', 'era', 4.39),
-- Garry Templeton
(30, 'career', 'hits', 2126),
(30, 'career', 'stolen_bases', 416),
(30, 'career', 'batting_average', 0.271),
-- Dave Lemanczyk
(31, 'career', 'wins', 31),
(31, 'career', 'strikeouts', 332),
(31, 'career', 'era', 4.6),
-- Phil Niekro
(32, 'career', 'wins', 318),
(32, 'career', 'strikeouts', 3342),
(32, 'career', 'era', 3.35),
-- Dick Pole
(33, 'career', 'wins', 19),
(33, 'career', 'losses', 25),
(33, 'career', 'era', 4.65),
(33, 'career', 'strikeouts', 156);
