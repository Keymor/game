import './GameStyle.css';
import { useEffect, useState, useMemo } from 'react'

function Game() {

  const gameItemList = [{
    type: 'damage',
    name: 'Sword',
    id: 1,
    price: 15,
    stat: 5,
    description: 'Damage 4-6',
    imageItem: 'itemSword',
    isEquip: false,
    hover: false
  },

  {
    type: 'armor',
    name: 'Cloth',
    id: 10,
    price: 25,
    stat: 3,
    description: '+ 3 armor',
    imageItem: 'itemArmor',
    isEquip: false,
    hover: false
  },

  {
    type: 'recourse',
    name: 'Iron',
    amount: 1,
    id: 20,
    price: 5,
    stat: 0,
    description: 'Iron for craft',
    imageItem: 'ironOre',
    hover: false
  },

  {
    type: 'recourse',
    name: 'Lether',
    amount: 1,
    id: 20,
    price: 5,
    stat: 0,
    description: 'Lether for craft',
    imageItem: 'lether',
    hover: false
  },

  {
    type: 'health',
    name: 'Flask',
    amount: 1,
    id: 20,
    price: 5,
    stat: 15,
    description: 'Restore HP +15',
    imageItem: 'flask',
    hover: false
  }
  ]
  const enemyList = [
    {
      monsterName: 'Wolf',
      monsterDamage: 3,
      monsterArmor: 0,
      monsterHealth: 15,
      monsterChance: 50,
      monsterExp: 20,
      imageItem: 'wolf',
      leftArmor: 2,
      middleArmor: 1,
      rightArmor: 2,
      status: true
    },
    {
      monsterName: 'Bear',
      monsterDamage: 7,
      monsterArmor: 3,
      monsterHealth: 28,
      monsterChance: 50,
      monsterExp: 40,
      imageItem: 'bear',
      leftArmor: 4,
      middleArmor: 2,
      rightArmor: 4,
      status: true
    }
  ]
  const location = useMemo(() => [
    {
      Id: 0,
      bgImg: 'bgCave',
      bgName: 'Cave',
      text: 'Here is start of your great jorney! Let`s move forword.',
      firtsButtonText: 'Next',
      secondButtonText: ''
    },
    {
      Id: 1,
      bgImg: 'bgVillage',
      bgName: 'Village',
      text: 'You are in a village. \n (Press "Menu" to make some actions)',
      firtsButtonText: 'Menu',
      secondButtonText: ''
    },
    {
      Id: 2,
      bgImg: 'bgForest',
      bgName: 'Forest',
      text: 'You are in a forest. Try to search some enemys or return to the village',
      firtsButtonText: 'Search',
      secondButtonText: 'Return'
    },
    {
      Id: 3,
      bgImg: 'bgCastle',
      bgName: 'Castle',
      firtsButtonText: '',
      secondButtonText: ''
    },
    ], [])
  
  const [curentQuestList, setCurentQuestList] = useState([{
    type: 'Bear',
    questText: 'Kill 1 bear',
    questCounter: 0,
    questGole: 1,
    questRevade: 20,
    isAccepted: false
  },
  {
    type: 'Wolf',
    questText: 'Kill 2 wolfs',
    questCounter: 0,
    questGole: 2,
    questRevade: 10,
    isAccepted: false
  },
  {
    type: 'lvl',
    questText: 'Buy armor',
    questCounter: 0,
    questGole: 1,
    questRevade: 200,
    isAccepted: false
  }])
  const [disableButton, setDisableButton] = useState(false)
  const [firstStepCounter, setFirstStepCounter] = useState(0)
  const [anim, setAnim] = useState(false)
  const [hiden, setHiden] = useState('hide hideDelay')
  const [actionTrigger, setActionTrigger] = useState(true)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [pointer, setPointer] = useState(false)
  const [pointerIndex, setPointerIndex] = useState({ index: null, name: '', description: '' })
  const [fightMode, setFightMode] = useState([{ fight: false }, {
    monsterName: 'Wolf',
    monsterDamage: 3,
    monsterArmor: 0,
    monsterHealth: 15,
    monsterChance: 50,
    monsterExp: 20,
    imageItem: 'wolf',
    leftArmor: 2,
    middleArmor: 1,
    rightArmor: 2,
    status: true
  }])
  const [currentInv, setCurrentInv] = useState([{
    type: 'damage',
    name: 'Sword',
    id: 1,
    price: 15,
    stat: 5,
    description: 'Damage 4-6',
    imageItem: 'itemSword',
    isEquip: false,
    hover: false
  }])
  const [buttonTest, setButtonTest] = useState(false)
  const [quests, setQuests] = useState(false)
  const [inventory, setInventory] = useState(false)
  const [shop, setShop] = useState(false)
  const [playerStats, setPlayerStats] = useState({
    health: 20,
    maximumHealth: 20,
    status: true,
    locationId: 0,
    exp: 0,
    damage: 2,
    armor: 1,
    gold: 200,
    chance: 80,
    leftButtonHit: '',
    middleButtonHit: 'Panch',
    rightButtonHit: '',
  })
  const [textLog, setTextLog] = useState({
    text: location[playerStats.locationId].text,
    firtsButtonText: location[playerStats.locationId].firtsButtonText,
    secondButtonText: location[playerStats.locationId].secondButtonText
  })

  useEffect(() => {
    setTimeout(() => setButtonTest(true), 500)
  }, []) 

  useEffect(() => {
    setTextLog(t => ({...t, 
      text: location[playerStats.locationId].text,
      firtsButtonText: location[playerStats.locationId].firtsButtonText,
      secondButtonText: location[playerStats.locationId].secondButtonText
    }))
  }, [playerStats.locationId, location])

  

// Mouse

  const handleMouse = (event) => { setPosition({ x: event.clientX, y: event.clientY + 20 }) }

  function hide(){

    if (actionTrigger){
      setHiden(h => h = '')
    } else {
      setHiden(h => h = 'hide')
      setTimeout(() => setHiden(h => h = 'hide hideDelay'), 1000)
    }
  }

  function mouseEnter(itemIndex, itemName, itemDescription) {
    setPointer(true)
    setPointerIndex([{ ...pointerIndex, index: itemIndex, name: itemName, description: itemDescription }])
  }

  function mouseLeave() {
    setPointer(false)
    setPointerIndex([{ ...pointerIndex, index: null, name: '', description: '' }])
  }

  const disableButtonAll = () => setTimeout(() => setDisableButton(false), 1000)

// Triggers

  const revardFun = (type, gift, index) => {
    switch (type) {
      case 'Wolf':
        setPlayerStats(p => (
          {...p, gold: p.gold + gift}
        ))
        setCurentQuestList(c => 
          c.map((q, i) => 
            i === index 
            ? {...q, isAccepted: false, questCounter: 0} 
            : q)
          )
        break;

      case 'Bear':
        setPlayerStats(p => (
          {...p, gold: p.gold + gift}
        ))
        setCurentQuestList(c => 
          c.map((q, i) => 
            i === index 
            ? {...q, isAccepted: false, questCounter: 0} 
            : q)
          )
        break;
    
      default:
        break;
    }
  }

  const questUpdate = (type) => {
    switch (type) {
      case 'Wolf':
        setCurentQuestList((c) => 
          c.map((quest) => 
            quest.type === type && quest.isAccepted && quest.questGole !== quest.questCounter 
              ? {...quest, questCounter: quest.questCounter + 1} 
              : quest))
        break;

      case 'Bear':
        setCurentQuestList((c) => 
          c.map((quest) => 
            quest.type === type && quest.isAccepted && quest.questGole !== quest.questCounter 
              ? {...quest, questCounter: quest.questCounter + 1} 
              : quest))
        break;
    
      default:
        break;
    }
  } 

  function firstStep(){
    if (firstStepCounter === 0){
      textUpdate('You found some village!')
      setFirstStepCounter(1)
    } else if (firstStepCounter === 1){
      setTextLog(t => ({ ...t, text: t.text + ' On the road you meet one man. He told you about problems in village with monsters.'}))
      setFirstStepCounter(2)
    } else {
      setPlayerStats(p => ({
        ...p, locationId: 1
      }))
    }
  }

  function buttonPressed(trigger) {
    setDisableButton(!disableButton)

    switch (trigger) {
      case 'S':
        shopTrigger()
        setActionTrigger(!actionTrigger)
        disableButtonAll()
        hide()
        break;

      case 'D':
        setPlayerStats(p => ({...p, locationId: 2}))
        setActionTrigger(!actionTrigger)
        disableButtonAll()
        hide()
        break;

      case 2:
        fightTrigger()
        setTextLog(t => ({...t, firtsButtonText: '', secondButtonText: ''}))
        disableButtonAll()
        break;

      case 'F':
        setPlayerStats(p => ({...p, locationId: 1}))
        disableButtonAll()
        break;

      default:
        setPlayerStats(p => ({...p, locationId: 1}))
        setActionTrigger(!actionTrigger)
        disableButtonAll()
        hide()
        break;
    }
  }

  function shopTrigger() {
    setButtonTest(!buttonTest)
    setShop(!shop)
  }

// Fight

  function fightTrigger() {
    setFightMode(() => {
      let select = Math.floor(Math.random() * enemyList.length)
      textUpdate(`You found the ${enemyList[select].monsterName}! Prepare your self!`)
      return[
        {...fightMode[0], fight: !fightMode[0].fight},
        enemyList[select]
      ]
    })
  }

  function fightSistem(side) {
    let playerDamage = playerStats.damage - fightMode[1][side]
    let newMonsterHealth = fightMode[1].monsterHealth - (playerDamage <= 0 ? 0 : playerDamage)
    let monsterDamage = fightMode[1].monsterDamage - playerStats.armor
    let newPlayerHealth = playerStats.health - (monsterDamage <= 0 ? 0 : monsterDamage)
    setDisableButton(!disableButton)

    const offButton = () => setTimeout(() => setDisableButton(false), 3000)
    offButton()

    if (newMonsterHealth <= 0){setFightMode(f => { 
        return [
          { ...f[0], fight: false }, { ...f[1], monsterHealth: 0, status: false }
        ]
      })
      textUpdate(`The ${fightMode[1].monsterName} is dead!`)
      questUpdate(fightMode[1].monsterName)
      setTextLog(t => ({
        ...t, 
        firtsButtonText: location[playerStats.locationId].firtsButtonText, 
        secondButtonText: location[playerStats.locationId].secondButtonText
      }))
      setPlayerStats(p => ({...p, exp: p.exp + fightMode[1].monsterExp}))

    } else if (newPlayerHealth <= 0){
        setPlayerStats(p => ({...p, health: newPlayerHealth}))
        gameOver()

      } else {
        setFightMode(f => { 
          return [
            { ...f[0], fight: true }, { ...f[1], monsterHealth: newMonsterHealth }
          ]  
        }, 
        massageDelay(),
        setAnim(true),  
        setTimeout(() => {
          setAnim(false)
          textUpdate(`${fightMode[1].monsterName} got ${playerDamage} damage. You got ${monsterDamage}.`)
        }, 3000)
      )}

      function massageDelay(){
          for (let index = 0; index < 4; index++){
            setTimeout(() => {
              textUpdate(`${fightMode[1].monsterName} attach after ${3 - index}`)
              if (index === 3){
                setPlayerStats(p => ({...p, health: newPlayerHealth}))
              }
            }, index * 666)
          }
      }
  }

  function gameOver(){
      return [
        setFightMode(f => {
          return[
            {...f[0], fight: false}, {...f[1]}
          ]}),
        setPlayerStats(p => ({
            ...p, health: 12, gold: p.gold - 5, exp: p.exp - 5
          })),
        textUpdate('You got too much damage! Somebody found you and return to the village'),
        setTextLog(t => ({...t, firtsButtonText: '', secondButtonText: 'Return'}))

        ]
  }

  function textUpdate(outputText){
        setTextLog(t => ({ ...t, text: outputText}))
  }

  /*------Item-Manipulation------*/

  function removeItem(itemIndex) {
    setCurrentInv(c => c.filter(item => c.indexOf(item) !== itemIndex))
  }

  function addItem(index) {
    setCurrentInv([...currentInv, gameItemList[index]])
    setPlayerStats({ ...playerStats, gold: playerStats.gold - gameItemList[index].price })
  }

  function equipItem(type, index) {
    let prevItemStat = 0
    setCurrentInv(currentInv.map((item, i) => {
      if (item.isEquip && item.type === type) {
        prevItemStat = item.stat
        setPlayerStats(p => ({ ...p, [type]: p[type] - prevItemStat }))
        return { ...item, isEquip: false }
      }
      if (i === index) {
        prevItemStat = item.stat
        setPlayerStats(p => ({ ...p, [type]: p[type] + prevItemStat }))
        return { ...item, isEquip: true }
      }
      return item
    }
    ))
  }

  const hendleButton = (i, number) => {
    let newHp = playerStats.health + number
    if(newHp > playerStats.maximumHealth){
      newHp = playerStats.maximumHealth
    }

    setPlayerStats(p => ({
      ...p, health: newHp
    }))
    removeItem(i)
    
  }

  return (
    <div className='body' onMouseMove={handleMouse}>
      {(pointer && pointerIndex[0].index >= 0) ? <div className='invItemHover' style={{ left: `${position.x}px`, top: `${position.y}px` }}>{pointerIndex[0].name}<br />{pointerIndex[0].description}</div> : null}
      <div className={`container ${location[playerStats.locationId].bgImg}`}>
        <div className='topInterface'>
          <button className='inventoryButton' onClick={() => setInventory(!inventory)}>Inventory</button>
          <div className={`stats ${ anim && fightMode[0].fight === true ? 'damageP' : null}`}>Health: {playerStats.health}/{playerStats.maximumHealth} | Exp: {playerStats.exp} | Gold: {playerStats.gold} | Damage: {playerStats.damage} | Armor: {playerStats.armor}</div>
          <button className='questsButton' onClick={() => setQuests(!quests)}>Quests</button>
        </div>
        <div className={`invContainer ${inventory ? 'invUp' : 'invDown'}`}>
          <div className='textWhide'><div className='invText'>Inventory</div></div>
          <div className={`inventoryList`}>
            {currentInv.map((item, index) =>
              <div className='inventoryGridItem' key={index}>
                <div className={item.imageItem} onMouseLeave={() => mouseLeave()} onMouseEnter={() => mouseEnter(index, item.name, item.description)} onMouseMove={handleMouse}></div>
                {item.isEquip ? '' : <button className='invButton' onClick={() => removeItem(index)}>Delete</button>}<br />
                {item.type === 'damage' || item.type === 'armor' ? <button className='invButton' onClick={() => equipItem(item.type, index)}>{item.isEquip ? 'TakeOff' : 'Equip'}</button> : ''}
                {item.type === 'health' && <button className='invButton' onClick={() => hendleButton(index, item.stat)}>Use</button>}
              </div>)}
          </div>
        </div>
        <ul className={`questList ${quests ? 'questUp' : 'questDown'}`}>Quests
          {curentQuestList.map((quest, index) => {
            if (playerStats.locationId === 1){
              return (
              <li 
              key={index} 
              className='questText'>
                {quest.isAccepted ? '' : 'New - '}
                {quest.questText} / {quest.questCounter}<br/>
                {playerStats.locationId === 1 
                && <button 
                    className='acceptQuest' 
                    onClick={() => {
                      setCurentQuestList(c => 
                        c.map((quest, i) => 
                          i === index 
                          ? {...quest, isAccepted: true} 
                          : quest)
                      )
                      }
                    } 
                    disabled={quest.isAccepted ? true : false}>Accept
                  </button> 
                }
              <button 
              style={{ visibility: quest.questCounter === quest.questGole ? 'visible' : 'hidden' }}
              onClick={() => revardFun(quest.type, quest.questRevade, index)}
              >Done
              </button>
              </li>)
            } else if (quest.isAccepted){
                return (
                <li 
                key={index} 
                className='questText'>
                  {quest.questText} / {quest.questCounter}<br/>
                  {playerStats.locationId === 1 
                  && <button className='acceptQuest' >Accept</button> 
                  }
                </li>)
          } return null
          }
          )}
          
        </ul>
        <div className={`actionContainer ${hiden}`}>
          <div className='action' onClick={() => buttonPressed('S')} onMouseLeave={() => mouseLeave()} onMouseEnter={() => mouseEnter(0, 'There is so meny goods', '')} onMouseMove={handleMouse}>Shop<br/><p className='actionText'>Go to the shop to buy or sell some items</p></div>
          <div className='action' onClick={() => buttonPressed('D')} onMouseLeave={() => mouseLeave()} onMouseEnter={() => mouseEnter(0, 'You need 100 exp!', '')} onMouseMove={handleMouse}>Forest<br/><p className='actionText'>Slay the monsters and gaine more expirience</p></div>
          <div className='action'onClick={() => setQuests(!quests)} onMouseLeave={() => mouseLeave()} onMouseEnter={() => mouseEnter(0, 'Find new quests', '')} onMouseMove={handleMouse}>Quests<br/><p className='actionText'>Accept quest to help the local peaple</p></div>
        </div>
        <div className={`enemyContainer ${fightMode[0].fight ? 'enemyUp' : 'enemyDown'}`}>
          <div className={`enemyBox ${ anim ? 'shake' : null}`}>
            <div className='healthEnemyContainer'><div className={`enemyHealth ${ anim ? 'damage' : null}`}>{fightMode[1].monsterHealth}</div></div>
            <p className='enemyName'>{fightMode[1].monsterName}</p>
            <div className={fightMode[1].imageItem}></div>
          </div>
        </div>
        <div className={`userFightContainer ${fightMode[0].fight ? 'enemyUp' : 'enemyDown'}`}>
          <div className='fightButtonContainer'>
            <button onClick={() => fightSistem('leftArmor')} className='leftButton'>{playerStats.leftButtonHit}</button>
            <button onClick={() => fightSistem('middleArmor')} className='middleButton' style={{pointerEvents: disableButton ? 'none' : 'auto'}}>{playerStats.middleButtonHit}</button>
            <button onClick={() => fightSistem('rightArmor')} className='rightButton'>{playerStats.rightButtonHit}</button>
          </div>
        </div>
        <div className={`shopContainer ${shop ? 'appear' : 'fade'}`}>
          <div className='shopBox'>
            <div className='storeText'>Store</div>
            <div className='traidWin'>
              {gameItemList.map((item, index) =>
                <div className='shopItem' key={index}>
                  <div className={item.imageItem} onMouseLeave={() => mouseLeave()} onMouseEnter={() => mouseEnter(index, item.name, item.description)}></div>
                  <div className='description'>{item.name}<br /></div>
                  <button className='buyButton' onClick={() => playerStats.gold >= item.price ? addItem(index) : null }>{item.price} gold</button>
                </div>
              )}
            </div>
            <div className='storeText'>Inventory</div>
            <div className='invListShop'>
              {currentInv.map((item, index) =>
                <div className='itemInvShop' key={index}>
                  <div className={item.imageItem} onMouseLeave={() => mouseLeave()} onMouseEnter={() => mouseEnter(index, item.name, item.description)}></div>
                  <div className='description'>{item.name}<br /></div>
                  {item.isEquip ? '' : <button className='sellButton' onClick={() => {
                    setPlayerStats({ ...playerStats, gold: playerStats.gold + Math.round(item.price * 0.6) })
                    setCurrentInv(c => c.filter(item => c.indexOf(item) !== index))
                  }}>SELL</button>}
                  {
                    item.type === 'damage' || item.type === 'armor' ? 
                      <button 
                      className='sellButton' 
                      onClick={() => equipItem(item.type, index)}
                      >{item.isEquip ? 'TakeOff' : 'Equip'}</button> : 
                      null
                  }
                </div>)}
            </div>
            <div className='storeExitButton' onClick={shopTrigger}>Exit</div>
          </div>
        </div>
        <div className={`messegeGeneration ${buttonTest ? 'animUp' : 'animDown'}`}>
          <button className='messegeButton1' 
          onClick={playerStats.locationId === 0 ? firstStep : () => buttonPressed(playerStats.locationId)} 
          style={{ 
            visibility: textLog.firtsButtonText.length === 0 ? 'hidden' : 'visible', 
            animation: playerStats.locationId <= 1 ? 'popUp 2s ease-in-out infinite' : 'none',
            boxShadow: playerStats.locationId <= 1 ? '0px 0px 20px rgba(255, 213, 106, 0.941)' : 'none',
            pointerEvents: disableButton ? 'none' : 'auto'
          }}
          >
            {textLog.firtsButtonText}
          </button>
          <button className='messegeButton2' 
          onClick={playerStats.locationId === 2 ? () => buttonPressed('F') : null} 
          style={{ visibility: textLog.secondButtonText.length === 0 ? 'hidden' : 'visible' }}
          >
            {textLog.secondButtonText}
            </button>
          <div className='messegeContainer'>
            <span className='messege'>{textLog.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Game;
