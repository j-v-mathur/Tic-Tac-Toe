gamesides = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]

var game_ended = false

check_if_already_played = (gridData, playermark, computermark)=> {
    let already_played = []
    for (let i = 1; i < 10; i++) {
        if(gridData[i]===playermark  || gridData[i]===computermark){
            already_played.push(i)
        }
    }
    return already_played
}

get_the_winning_side = (gridData, mark)=> {
    for (let i = 0; i < 8; i++) {
        if(gridData[gamesides[i]['0']]===mark&&gridData[gamesides[i]['1']]===mark&&gridData[gamesides[i]['2']]===mark)
        {
            return gamesides[i]
        }
    }
}


check_game_result = (gridData, playermark, computermark)=> {
    //checking if the grid is filled
    let fill_count = 0 
    for (let i = 1; i < 10; i++) {
            if(gridData[i]===playermark||gridData[i]===computermark){
                fill_count+=1
            }
        }
    //checking if the grid is filled
    for (let i = 0; i < 8; i++) {
        console.log(i)
        console.log(gamesides[i])
        if(gridData[gamesides[i]['0']]===playermark&&gridData[gamesides[i]['1']]===playermark&&gridData[gamesides[i]['2']]===playermark)
        {
            game_ended = true
            return -2
            //player Won
        }
        if(gridData[gamesides[i]['0']]===computermark&&gridData[gamesides[i]['1']]===computermark&&gridData[gamesides[i]['2']]===computermark)
        {
            game_ended = true
            return -3
            //computer Won
        }
        
    }
    if(fill_count===9){
        game_ended = true
        return -1
        //draw
        }
        else{
            return 0
            //nothing happens
        }
        
}


generate_random_computer_move = (gridData, playermark, computermark) =>{
    console.log(gridData, playermark, computermark)
    let already_played = []
    for (let i = 1; i < 10; i++) {
        if(gridData[i]===playermark  || gridData[i]===computermark){
            already_played.push(i)
        }
    }
    console.log(already_played)
    let computer_move = Math.floor(Math.random() * 9) + 1;
    while(already_played.includes(computer_move)){
        if(already_played.length===9){
            computer_move = -1
            break;
        }
        computer_move = Math.floor(Math.random() * 9) + 1;

    }
    return computer_move; 
    
}

computermoves = (gridData, playermark, computermark) => {
    console.log('This')
    console.log(gridData)
    //check if this is the first move of computer and play randomly at first


    let countcomputermark = 0
    let move = null
    for (let i = 1; i < 10; i++) {
            if(gridData[i]===computermark){
                console.log(i)
                console.log(gridData[i])
                countcomputermark+=1;
            }
      }
    if(countcomputermark===0){
        console.log("First Move")
        console.log(countcomputermark)
        return generate_random_computer_move(gridData, playermark, computermark);
    }

    //check if you have 2 computer-marks in a set if yes then complete the set and end game
    //Check whether the player has 2 player-marks in sets then place computer-mark in the remaining
    
    for (let i = 0; i < 8; i++) {
        computermark_oneside_count = 0
        //computermark_oneside_marks = [null,null,null]
        playermark_oneside_count = 0
        
        for (let j = 0; j < 3; j++) {
            if(gridData[gamesides[i][j]]===computermark){
                computermark_oneside_count += 1
            }
            if(gridData[gamesides[i][j]]===playermark){
                playermark_oneside_count += 1
            }
            
        if(computermark_oneside_count===2){
            for (let k = 0; k < 3; k++) {
                if(gridData[gamesides[i][k]]!==computermark && gridData[gamesides[i][k]]!==playermark){
                    console.log('Algo1')
                    console.log(gamesides[i][k])
                    console.log(gridData)
                    if(check_if_already_played(gridData, playermark, computermark).includes(gamesides[i][k])){
                        break
                    }
                    else{
                        move = gamesides[i][k]
                    }
                }
            }
        }
        
        if(playermark_oneside_count===2){
            for (let l = 0; l < 3; l++) {
                if(gridData[gamesides[i][l]]!==playermark && gridData[gamesides[i][l]]!==computermark){
                    console.log('Algo2')
                    console.log(gamesides[i][l])
                    console.log(gridData)
                    if(check_if_already_played(gridData, playermark, computermark).includes(gamesides[i][l])){
                        break
                    }
                    else{
                        move = gamesides[i][l]
                    }
                }
            }
        }
        if(move){
            console.log('loop breaks')
            console.log(move)
            break
        }
    }
    if(move){
        console.log('loop breaks2')
        console.log(move)
        break
    }

    }


    if(move){
        return move
    }
    else{
    //other cases random 
    console.log("Other Case")
    return generate_random_computer_move(gridData, playermark, computermark);

    }
}

startGame = () => {
    console.log("game started")
    let playerName = document.getElementById("playername");
    let mark = document.getElementsByName("mark");
    let markchar = null
    for (i = 0; i < mark.length; i++) {
        if (mark[i].checked){
            markchar = mark[i].value
        }
        }
    
    //1  2  3
    //4  5  6
    //7  8  9

    var gridData = {1:null, 2:null, 3:null, 4:null, 5:null, 6:null,
    7:null, 8:null, 9:null}
    //possible boxes 1-(00),2-(01),3-(02),4-(10),5-(11),6-(12),7-(20),8-(21),9-(22)          

    console.log(playerName.value)
    console.log(markchar)
    let playermark = markchar
    let computermark = null
    if(playermark==='X'){
        computermark = 'O'
    }
    else{
        computermark = 'X'
    }


    document.getElementById('1').addEventListener('click', function (event) {
        if(document.getElementById('1').innerHTML==='' && game_ended == false)
        {
            console.log('1 clicked')
            gridData[1] = playermark
            document.getElementById('1').innerHTML = playermark
            console.log(gridData)
            let computer_move = computermoves(gridData, playermark, computermark)
            if(check_game_result(gridData, playermark, computermark)!==0){
                computer_move = check_game_result(gridData, playermark, computermark)
            }

            if(computer_move===-1){
                console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');

                audio.loop = true;
                audio.play();                 
            } 
            else if(computer_move===-2){
                console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();                  
            } 
            else if(computer_move===-3){
                console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
            }
            else{
                gridData[computer_move] = computermark
                document.getElementById(computer_move).innerHTML = computermark  
                
                if(check_game_result(gridData, playermark, computermark)!==0){
                    computer_move = check_game_result(gridData, playermark, computermark)
                }
    
                if(computer_move===-1){
                console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();   
                } 
                else if(computer_move===-2){
                console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();              
                } 
                else if(computer_move===-3){
                console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
                }
        
            }

        }
        else{
            console.log('prohibited click')
            //we can have a problem here
        }
    });

    document.getElementById('2').addEventListener('click', function (event) {
        if(document.getElementById('2').innerHTML==='' && game_ended == false)
        {
            console.log('2 clicked')
            gridData[2] = playermark
            document.getElementById('2').innerHTML = playermark
            console.log(gridData)
            let computer_move = computermoves(gridData, playermark, computermark)
            if(check_game_result(gridData, playermark, computermark)!==0){
                computer_move = check_game_result(gridData, playermark, computermark)
            }

            if(computer_move===-1){
                console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play(); 
            } 
            else if(computer_move===-2){
                console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();             
                
                
            } 
            else if(computer_move===-3){
                console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
                
            }
            else{
                gridData[computer_move] = computermark
                document.getElementById(computer_move).innerHTML = computermark  
                
                if(check_game_result(gridData, playermark, computermark)!==0){
                    computer_move = check_game_result(gridData, playermark, computermark)
                }
    
                if(computer_move===-1){
                console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                    
                } 
                else if(computer_move===-2){
                console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();             
                
                    
                } 
                else if(computer_move===-3){
                    console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
                }
        
            }

        }
        else{
            console.log('prohibited click')
            //we can have a problem here
        }
    });

    document.getElementById('3').addEventListener('click', function (event) {
        if(document.getElementById('3').innerHTML==='' && game_ended == false)
        {
            console.log('3 clicked')
            gridData[3] = playermark
            document.getElementById('3').innerHTML = playermark
            console.log(gridData)
            let computer_move = computermoves(gridData, playermark, computermark)
            if(check_game_result(gridData, playermark, computermark)!==0){
                computer_move = check_game_result(gridData, playermark, computermark)
            }

            if(computer_move===-1){
                console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();                
                
            } 
            else if(computer_move===-2){
                console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();             
                
                
            } 
            else if(computer_move===-3){
                console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
                
            }
            else{
                gridData[computer_move] = computermark
                document.getElementById(computer_move).innerHTML = computermark  
                
                if(check_game_result(gridData, playermark, computermark)!==0){
                    computer_move = check_game_result(gridData, playermark, computermark)
                }
    
                if(computer_move===-1){
                    console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();                
                    
                } 
                else if(computer_move===-2){
                    console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();             
                
                    
                } 
                else if(computer_move===-3){
                    console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
                    
                }
        
            }

        }
        else{
            console.log('prohibited click')
            //we can have a problem here
        }
    });

    document.getElementById('4').addEventListener('click', function (event) {
        if(document.getElementById('4').innerHTML==='' && game_ended == false)
        {
            console.log('4 clicked')
            gridData[4] = playermark
            document.getElementById('4').innerHTML = playermark
            console.log(gridData)
            let computer_move = computermoves(gridData, playermark, computermark)
            if(check_game_result(gridData, playermark, computermark)!==0){
                computer_move = check_game_result(gridData, playermark, computermark)
            }

            if(computer_move===-1){
                console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();                
                
            } 
            else if(computer_move===-2){
                console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();             
                
                
            } 
            else if(computer_move===-3){
                console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
                
            }
            else{
                gridData[computer_move] = computermark
                document.getElementById(computer_move).innerHTML = computermark  
                
                if(check_game_result(gridData, playermark, computermark)!==0){
                    computer_move = check_game_result(gridData, playermark, computermark)
                }
    
                if(computer_move===-1){
                    console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();                
                    
                } 
                else if(computer_move===-2){
                    console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();             
                
                    
                } 
                else if(computer_move===-3){
                    console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
                    
                }
        
            }

        }
        else{
            console.log('prohibited click')
            //we can have a problem here
        }
    });

    document.getElementById('5').addEventListener('click', function (event) {
        if(document.getElementById('5').innerHTML==='' && game_ended == false)
        {
            console.log('5 clicked')
            gridData[5] = playermark
            document.getElementById('5').innerHTML = playermark
            console.log(gridData)
            let computer_move = computermoves(gridData, playermark, computermark)
            if(check_game_result(gridData, playermark, computermark)!==0){
                computer_move = check_game_result(gridData, playermark, computermark)
            }

            if(computer_move===-1){
                console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();                
                
            } 
            else if(computer_move===-2){
                console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();             
                
                
            } 
            else if(computer_move===-3){
                console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
                
            }
            else{
                gridData[computer_move] = computermark
                document.getElementById(computer_move).innerHTML = computermark  
                
                if(check_game_result(gridData, playermark, computermark)!==0){
                    computer_move = check_game_result(gridData, playermark, computermark)
                }
    
                if(computer_move===-1){
                    console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();                
                    
                } 
                else if(computer_move===-2){
                    console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();             
                
                    
                } 
                else if(computer_move===-3){
                    console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
                    
                }
        
            }

        }
        else{
            console.log('prohibited click')
            //we can have a problem here
        }
    });

    document.getElementById('6').addEventListener('click', function (event) {
        if(document.getElementById('6').innerHTML==='' && game_ended == false)
        {
            console.log('6 clicked')
            gridData[6] = playermark
            document.getElementById('6').innerHTML = playermark
            console.log(gridData)
            let computer_move = computermoves(gridData, playermark, computermark)
            if(check_game_result(gridData, playermark, computermark)!==0){
                computer_move = check_game_result(gridData, playermark, computermark)
            }

            if(computer_move===-1){
                console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();                
                
            } 
            else if(computer_move===-2){
                console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();             
                
                
            } 
            else if(computer_move===-3){
                console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
                
            }
            else{
                gridData[computer_move] = computermark
                document.getElementById(computer_move).innerHTML = computermark  
                
                if(check_game_result(gridData, playermark, computermark)!==0){
                    computer_move = check_game_result(gridData, playermark, computermark)
                }
    
                if(computer_move===-1){
                    console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();                
                    
                } 
                else if(computer_move===-2){
                    console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();             
                
                    
                } 
                else if(computer_move===-3){
                    console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
                    
                }
        
            }

        }
        else{
            console.log('prohibited click')
            //we can have a problem here
        }
    });

    document.getElementById('7').addEventListener('click', function (event) {
        if(document.getElementById('7').innerHTML==='' && game_ended == false)
        {
            console.log('7 clicked')
            gridData[7] = playermark
            document.getElementById('7').innerHTML = playermark
            console.log(gridData)
            let computer_move = computermoves(gridData, playermark, computermark)
            if(check_game_result(gridData, playermark, computermark)!==0){
                computer_move = check_game_result(gridData, playermark, computermark)
            }

            if(computer_move===-1){
                console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();                
                
            } 
            else if(computer_move===-2){
                console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();             
                
                
            } 
            else if(computer_move===-3){
                console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
                
            }
            else{
                gridData[computer_move] = computermark
                document.getElementById(computer_move).innerHTML = computermark  
                
                if(check_game_result(gridData, playermark, computermark)!==0){
                    computer_move = check_game_result(gridData, playermark, computermark)
                }
    
                if(computer_move===-1){
                    console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();                
                    
                } 
                else if(computer_move===-2){
                    console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();             
                
                    
                } 
                else if(computer_move===-3){
                    console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
                    
                }
        
            }

        }
        else{
            console.log('prohibited click')
            //we can have a problem here
        }
    });

    document.getElementById('8').addEventListener('click', function (event) {
        if(document.getElementById('8').innerHTML==='' && game_ended == false)
        {
            console.log('8 clicked')
            gridData[8] = playermark
            document.getElementById('8').innerHTML = playermark
            console.log(gridData)
            let computer_move = computermoves(gridData, playermark, computermark)
            if(check_game_result(gridData, playermark, computermark)!==0){
                computer_move = check_game_result(gridData, playermark, computermark)
            }

            if(computer_move===-1){
                console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();                
                
            } 
            else if(computer_move===-2){
                console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();             
                
                
            } 
            else if(computer_move===-3){
                console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
                
            }
            else{
                gridData[computer_move] = computermark
                document.getElementById(computer_move).innerHTML = computermark  
                
                if(check_game_result(gridData, playermark, computermark)!==0){
                    computer_move = check_game_result(gridData, playermark, computermark)
                }
    
                if(computer_move===-1){
                    console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <button style={background-color: lightgreen;}>Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();                
                    
                } 
                else if(computer_move===-2){
                    console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();             
                
                    
                } 
                else if(computer_move===-3){
                    console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
                    
                }
        
            }

        }
        else{
            console.log('prohibited click')
            //we can have a problem here
        }
    });

    document.getElementById('9').addEventListener('click', function (event) {
        if(document.getElementById('9').innerHTML==='' && game_ended == false)
        {
            console.log('9 clicked')
            gridData[9] = playermark
            document.getElementById('9').innerHTML = playermark
            console.log(gridData)
            let computer_move = computermoves(gridData, playermark, computermark)
            if(check_game_result(gridData, playermark, computermark)!==0){
                computer_move = check_game_result(gridData, playermark, computermark)
            }

            if(computer_move===-1){
                console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                                                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();                
                
            } 
            else if(computer_move===-2){
                console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();             
                
                
            } 
            else if(computer_move===-3){
                console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
                
            }
            else{
                gridData[computer_move] = computermark
                document.getElementById(computer_move).innerHTML = computermark  
                
                if(check_game_result(gridData, playermark, computermark)!==0){
                    computer_move = check_game_result(gridData, playermark, computermark)
                }
    
                if(computer_move===-1){
                    console.log('Game Draw')
                document.getElementById("instructiontoplayer").innerHTML = 
                                                `<h4 style="font-family:cursive; font-size: 2">Game Draw</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();                
                    
                } 
                else if(computer_move===-2){
                    console.log('player Won')
                let winning_side = get_the_winning_side(gridData, playermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[1]).style.backgroundColor = "#43766C";
                document.getElementById(winning_side[2]).style.backgroundColor = "#43766C";
                document.getElementById("instructiontoplayer").innerHTML = 
                `<h4 style="font-family:cursive; font-size: 2"> `+playerName.value+` Won</h4>
                <br>
                <image src="gif/winning.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/dancing_meme_win.mp3');
                audio.loop = true;
                audio.play();             
                
                    
                } 
                else if(computer_move===-3){
                    console.log('compute Won')
                let winning_side = get_the_winning_side(gridData, computermark);
                console.log(winning_side)
                document.getElementById(winning_side[0]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[1]).style.backgroundColor = "#B31312";
                document.getElementById(winning_side[2]).style.backgroundColor = "#B31312";
                document.getElementById("instructiontoplayer").innerHTML = 
                                                                `<h4 style="font-family:cursive; font-size: 2">`+playerName.value+` Lost</h4>
                <br>
                <image src="gif/draw_lose.gif" style="width: 4cm; height: 2cm"></image>
                <br> 
                <button style='background-color: lightgreen;' onClick="window.location.href=window.location.href">Replay</button> `
                let audio = new Audio('mp3/loosing_and_draw_sound_moye_moye.mp3');
                audio.loop = true;
                 audio.play();
                    
                }
        
            }

        }
        else{
            console.log('prohibited click')
            //we can have a problem here
        }
    });


    if(playerName.value===null || playerName.value === "" || markchar === "" || markchar===null){
        window.alert('Please enter a player name & mark');
        location.reload();
        //please put an alert here and show to the user
    }
    else{
        let startGame = document.getElementById("startgame");
        console.log(startGame);
        document.getElementById("startgame").innerHTML =
         `<h3 style="color: #003333;">`+playerName.value+ " ("+ playermark+`) <br> Computer (`+computermark+ `)</h3>` ;
        if(playermark==='X'){
            document.getElementById("instructiontoplayer").innerHTML = 
            `<h4 style="font-family:cursive; font-size: 2">Select Boxes Below</h4>`
        }
        else{
            const computer_move1 = Math.floor(Math.random() * 9) + 1;
            gridData[computer_move1] = computermark
            document.getElementById(computer_move1).innerHTML = computermark       
            document.getElementById("instructiontoplayer").innerHTML = 
            `<h4 style="font-family:cursive; font-size: 2">Select Boxes Below</h4>`     
        }
}
}