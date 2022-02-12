function GetNPCReady () {
	
}
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.up.isPressed()) {
        ChangeLeanYBy(-1)
    } else if (controller.down.isPressed()) {
        ChangeLeanYBy(1)
    } else if (controller.left.isPressed()) {
        ChangeLeanXBy(-1)
    } else if (controller.right.isPressed()) {
        ChangeLeanXBy(1)
    } else if (controller.A.isPressed()) {
    	
    } else {
    	
    }
})
function LoadLevel () {
    tiles.loadMap(LevelList[CurrentLevelIndex])
    LeanX = 0
    LeanY = 0
    GetPlayer1Ready()
    GetNPCReady()
}
function ApplyGravity () {
    Player1Sprite.setVelocity(LeanX * MovementMultiplier, LeanY * MovementMultiplier)
}
function ChangeLeanYBy (changeBy: number) {
    LeanY += changeBy
    if (LeanY < MinimumLean) {
        LeanY = MinimumLean
    }
    if (LeanY > MaximumLean) {
        LeanY = MaximumLean
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite, location) {
    sprite.destroy()
    LoadLevel()
    info.changeLifeBy(-1)
    sprite.startEffect(effects.spray, 500)
})
function NextLevel () {
    CurrentLevelIndex += 1
    if (CurrentLevelIndex >= LevelList.length) {
        GameOver(true)
    } else {
        LoadLevel()
    }
}
function UpdateFire () {
    if (BackgroundImageAnimationIndex == 0) {
        BackgroundImageAnimationIndex = 1
        tiles.replaceAllTiles(sprites.dungeon.hazardLava1, sprites.dungeon.hazardLava0)
    } else {
        BackgroundImageAnimationIndex = 0
        tiles.replaceAllTiles(sprites.dungeon.hazardLava0, sprites.dungeon.hazardLava1)
    }
}
function ChangeLeanXBy (changeBy: number) {
    LeanX += changeBy
    if (LeanX < MinimumLean) {
        LeanX = MinimumLean
    }
    if (LeanX > MaximumLean) {
        LeanX = MaximumLean
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.swamp.swampTile9, function (sprite, location) {
    NextLevel()
    sprite.startEffect(effects.confetti, 500)
})
function InitGame () {
    LevelList = [tiles.createMap(tilemap`level3`), tiles.createMap(tilemap`level4`)]
    CurrentLevelIndex = -1
    BackgroundImageAnimationIndex = 0
    info.setScore(0)
    info.setLife(3)
    MinimumLean = -5
    MaximumLean = 5
    MovementMultiplier = 10
}
function GameOver (PlayerWon: boolean) {
    if (PlayerWon) {
        game.over(true)
    } else {
        game.over(false)
    }
}
function GetPlayer1Ready () {
    Player1Sprite = sprites.create(img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `, SpriteKind.Player)
    Player1Sprite.setStayInScreen(true)
    tiles.placeOnRandomTile(Player1Sprite, sprites.skillmap.islandTile4)
    scene.cameraFollowSprite(Player1Sprite)
    animation.runImageAnimation(
    Player1Sprite,
    [img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `,img`
        . . b b b . . . 
        . b 5 5 5 b . . 
        b 5 d 3 d 5 b . 
        b 5 3 5 1 5 b . 
        c 5 3 5 1 d c . 
        c 5 d 1 d d c . 
        . f d d d f . . 
        . . f f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 d 1 5 b . 
        . b 5 3 1 5 b . 
        . c 5 3 1 d c . 
        . c 5 1 d d c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . . b 1 1 b . . 
        . . b 5 5 b . . 
        . . b d d b . . 
        . . c d d c . . 
        . . c 3 3 c . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 1 d 5 b . 
        . b 5 1 3 5 b . 
        . c d 1 3 5 c . 
        . c d d 1 5 c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b b . . 
        . . b 5 5 5 b . 
        . b 5 d 3 d 5 b 
        . b 5 1 5 3 5 b 
        . c d 1 5 3 5 c 
        . c d d 1 d 5 c 
        . . f d d d f . 
        . . . f f f . . 
        `],
    200,
    true
    )
}
let BackgroundImageAnimationIndex = 0
let MaximumLean = 0
let MinimumLean = 0
let MovementMultiplier = 0
let Player1Sprite: Sprite = null
let LeanY = 0
let LeanX = 0
let CurrentLevelIndex = 0
let LevelList: tiles.WorldMap[] = []
InitGame()
NextLevel()
game.onUpdateInterval(500, function () {
    ApplyGravity()
    UpdateFire()
})
