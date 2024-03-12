import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { CheckBox } from 'react-native-elements';

const PhysicalHealth = ({ selectedTheme, userId }) => {
  // Define content based on the selectedTheme
  const contentByTheme = {
    Theme_Anxiety: {
      text: 'Content specific to Anxiety...',
    },
    Theme_Fertility: {
      text: 'Content specific to Fertility...',
    },
    Theme_Menopause: {
      text: 'Content specific to Menopause...',
    },
    Theme_PMS: {
      text: 'Content specific to PMS...',
    },
    Theme_SkinHair: {
      text: 'Content specific to Skin & Hair...',
    },
    Theme_Sleep: {
      text: 'Content specific to Sleep...',
    },
    Theme_StomachBowel: {
      progressbarTitle: 'Mage & tarm',
      text: 'Träning handlar inte bara om att få starka muskler eller att påverka din vikt, utan har också bra fördelar för matsmältningen som vi inte alltid tänker på.\n\nFysisk aktivitet ger en signal till vår kropp att den ska hålla sig aktiv på mer än ett sätt. Precis som våra hjärtan pumpar snabbare och våra lungor arbetar hårdare under träning, reagerar vårt matsmältningssystem också positivt på ökad aktivitet.\n\nFysisk träning kan okcså öka antalet gynnsamma mikrobiella arter, berika mångfalden av mikroflora och förbättra utvecklingen av samlevande bakterier. Alla dessa effekter är fördelaktiga och förbättrar den övergripande hälsostatusen. Det kan också öka cirkulationen till matsmältningsorganen och förbättra ämnesomsättningen.',
      box1Header: 'Magpass',
      box1: 'Aerobisk träning\nAll aerobisk träning ökar blodflödet till tarmarna och förbättrar matsmältningen genom att, tarmrörelserna, ökar. Bra val är löpning, cykling och simning. Även styrketräning för magen där det intra- abdominala trycket ökar förbättrar tarmrörelserna, sit-ups, plankan och sneda crunches med vikt stimulerar tarmrörelsena och motverkar förstoppning. ',
      box2Header: 'Yogapass för matsmältning',
      box2: 'Meditativ träning\nAll meditativ aktivitet som till exempel yoga dämpar det sympatiska stressystemet. Stress hindrar blodflöde till tarmarna och utsöndring av matsmältningsenzymer.',  
      box3Header: 'Qi Gong Mage',
      box3: 'Qi Gong\nTesta Qi gong-övningen av 8 brokader, som är specifikt anpassad för elementet jord (matsmältning).',   
    },
    Theme_Stress: {
      text: 'Content specific to Stress...',
    },
    Theme_Mjälte: {
      progressbarTitle: 'Mitt hälsopaket',
      text: 'TCM rekommenderar regelbunden rörelse och motion för att upprätthålla tillräcklig Qi (energi) rörelse och flöde. Passande rörelse och motion kommer därför att föra Qi, främja nedbrytningen av mat, tarmrörelser och hormonproduktion. Genom regelbunden träning ökar det vitala flödet av Qi-energi, samtidigt som det minskar fuktighet inom kroppen. Fuktighet kan skada mjälteenergin och ses som övervikt, vilket kan påverka humöret genom att få individer att känna sig tröga, dimmiga i huvudet och till och med deprimerade.\n\nYin spelar en stor roll för mängden blod och andra vitala vätskor som finns i kroppen. Kraftig motion tömmer denna vitala energikälla och påverkar därför negativt fysisk och mental hälsa. Det är också viktigt att inte överanstränga kroppen med motion.\n\nMjälten behöver enligt TCM övningar som ger lugn, avslappning och medvetenhet. Att överanstränga kroppen kan i stället skapa stress och belasta mjälten. Fokusera därför på övningar som främjar djupandning för att stödja matsmältningen och underlätta näringsupptaget.',
      box1Header: 'Qi Gong Mjälte',
      box1: 'Gör gärna Qi Gong för mjältens energi morgon och kväll om du har möjlighet.',
      box2Header: 'Qi Gong Mjälte, mage & Qi',
      box2: 'Vad ska det vara för text här?',
      box3Header: 'Yoga för mjälten',
      box3: 'Vad ska det vara för text här?',
      box4Header: 'Knektövning',
      box4: 'Vad ska det vara för text här?',
      box5Header: 'Akupressur för mjältens energi',
      box5: 'Vad ska det vara för text här?',
    },
    Theme_Lever: {
      progressbarTitle: 'Mitt hälsopaket',
      text: 'Träning är avgörande för att minska fettlever, öka cirkulationen, lugna inflammation i levern och öka insulinkänsligheten. Liksom skelettmuskulaturen anpassar sig levern till upprepade krav på träning genom att öka sin kapacitet att producera energi genom att oxidera fett. Förmågan hos regelbunden fysisk aktivitet att öka fettoxidationen är skyddande och kan vända fettleversjukdom.',
      box1Header: 'Sömn',
      box1: 'Sömn är viktigt för både för yin och blod-återställning så se till att du får tillräckligt med återhämtande sömn. Enligt vår cirkadiska klocka, 24-timmarssystemet som reglerar funktioner i cellerna bör vi gå och lägga oss senast kl. 22.',
      box2Header: 'Torrborstning',
      box2: 'Genom torrborstning så sätter du fart på blodcirkulationen, som stödjer utrensningen genom lymfsystemet. Dessutom hjälper det till att avlägsna döda hudceller som i sin tur bidrar till att hålla porerna öppna och rena så att avfallsprodukter lättare kan transporteras ut.\n\nTorrborsta din kropp i 3 minuter dagligen, före dusch.',
      box3Header: 'Qi Gong',
      box3: 'Qi Gong-övning som stöttar levermeridianen. Hur ofta?',
      box4Header: 'Akupressur',
      box4: 'Genom att applicera tryck på vissa punkter längs specifika meridianer kan blockeringar av qi lösas upp, återställa leverns balans och öka välbefinnandet. Akupressur kan också lindra smärta, minska stress och förbättra cirkulationen genom att stimulera kroppens naturliga läkningsmekanismer.',
    },
    Theme_Njure: {
      progressbarTitle: 'Mitt hälsopaket',
      text: 'Här får du tips på olika fysiska övningar som du kan göra för att stärka njurarnas energi. Spara till din rutin för att bli påmind.',
      box1Header: 'Nourished sleep meditation',
      box1: 'Sömn är avgörande för en frisk hjärna, kropp och emotionell hälsa och välbefinnande. Glymfatik, vilket är hjärnans omorganisering och rengöring som sker, kan inte göra sitt jobb om vi inte sover. Att få rätt mängd sömn mellan 7-8 timmar per natt, vid ungefär samma tidpunkt, är av yttersta vikt.',
      box2Header: 'Journalövning',
      box2: 'En journalövning hjälper dig att frigöra eventuella trauma från den fysiska kroppen.',
      box3Header: 'Qi Gong',
      box3: 'Dynamisk träning är bra för jordning och metabolism. Det stödjer och bygger upp njurarnas yin och yang.',
      box4Header: 'Akupressur',
      box4: 'Akupressur stimulerar Qi samt rörelsen av Qi och blod för att främja läkning. Genom att applicera tryck på specifika punkter längs specifika meridianer kan blockeringar av qi släppas, återställa balans och främja övergripande välbefinnande. Akupressur kan lindra smärta, minska stress och förbättra cirkulationen genom att stimulera kroppens naturliga läkningsmekanismer.',
    },
    Theme_Qi: {
      progressbarTitle: 'Mitt hälsopaket',
      text: 'För att balansera Qi är det bra att röra på dig dagligen. Inkludera gärna daglig Qi Gong, en snabb promenad, yoga eller annan fysisk träning. Var medveten om att det inte behöver överdrivas.',
      box1Header: 'Sömn & sömnrutiner',
      box1: 'Sömn är avgörande för en frisk hjärna, kropp och emotionell hälsa och välbefinnande. Glymfatik, vilket är hjärnans omorganisering och rengöring som sker, kan inte göra sitt jobb om vi inte sover. Att få rätt mängd sömn mellan 7-8 timmar per natt, vid ungefär samma tidpunkt, är av yttersta vikt.',
      box2Header: '',
      box2: '',
      box3Header: '',
      box3: '',
      box4Header: '',
      box4: '',
    },
    Theme_Well: {
      progressbarTitle: 'Mitt hälsopaket',
      text: 'För att balansera Qi är det bra att röra på dig dagligen. Inkludera gärna daglig Qi Gong, en snabb promenad, yoga eller annan fysisk träning. Var medveten om att det inte behöver överdrivas.',
      box1Header: 'Sömn & sömnrutiner',
      box1: 'Sömn är avgörande för en frisk hjärna, kropp och emotionell hälsa och välbefinnande. Glymfatik, vilket är hjärnans omorganisering och rengöring som sker, kan inte göra sitt jobb om vi inte sover. Att få rätt mängd sömn mellan 7-8 timmar per natt, vid ungefär samma tidpunkt, är av yttersta vikt.',
      box2Header: '',
      box2: '',
      box3Header: '',
      box3: '',
      box4Header: '',
      box4: '',
    },
    // Add more themes as needed
  };

  // Get content based on the selectedTheme
  const content = contentByTheme[selectedTheme] || {};

  const [expandedBoxes, setExpandedBoxes] = useState({
    box1: false,
    box2: false,
    box3: false,
    box4: false,
    box5: false,
  });
  const [checkedBoxes, setCheckedBoxes] = useState({
    box1: false,
    box2: false,
    box3: false,
    box4: false,
    box5: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(getFirestore(), 'users', userId, 'themes', selectedTheme);
        const userDocSnapshot = await getDoc(userDocRef);
  
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setExpandedBoxes(userData.expandedBoxes || {});
          setCheckedBoxes(userData.checkedBoxes || {});
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [userId, selectedTheme]);  

  const toggleBox = async (box, isCheckbox) => {
    const headerKey = `${box}Header`;
  
    if (isCheckbox) {
      try {
        const userDocRef = doc(getFirestore(), 'users', userId, 'themes', selectedTheme);
        await updateDoc(userDocRef, {
          [box]: contentByTheme[selectedTheme][box], // Save the content
          [headerKey]: contentByTheme[selectedTheme][headerKey], // Save the header
        });
  
        // Toggle the checkbox state in local state
        setCheckedBoxes((prevState) => ({
          ...prevState,
          [box]: !prevState[box],
        }));
  
        console.log(`Content and header for ${box} saved to Firestore`);
      } catch (error) {
        console.error('Error setting content and header:', error);
      }
    } else {
      setExpandedBoxes((prevState) => ({
        ...prevState,
        [box]: !prevState[box],
      }));
    }
  };
  
  const renderCheckboxIcon = (box) => {
    return (
      <CheckBox
        checked={checkedBoxes[box]}
        onPress={() => toggleBox(box, true)}
        checkedIcon="check-circle"
        uncheckedIcon="circle-o"
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        checkedColor="#709078" // Set the color for the checkmark
      />
    );
  };

  const renderArrowIcon = (box) => {
    return (
      <TouchableOpacity onPress={() => toggleBox(box, false)}>
        <View style={styles.headerArrow}>
          <Text style={styles.secondHeader}>
            {contentByTheme[selectedTheme]?.[`${box}Header`] || ''}
          </Text>
          <View style={styles.arrowContainer}>
            {expandedBoxes[box] ? (
              <Icon name="keyboard-arrow-up" style={styles.arrowIcon} />
            ) : (
              <Icon name="keyboard-arrow-down" style={styles.arrowIcon} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderContent = (box, fullText) => {
    return (
      <View>
        {expandedBoxes[box] && <Text style={styles.text}>{fullText}</Text>}
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      {content.progressbarTitle && <Text>{content.progressbarTitle}</Text>}
      <Text style={styles.header}>Fysisk hälsa</Text>
      {content.text && <Text style={styles.introText}>{content.text}</Text>}
      {['box1', 'box2', 'box3', 'box4', 'box5'].map((box) => (
        // Check if the box is defined in contentByTheme[selectedTheme]
        contentByTheme[selectedTheme]?.[box] && (
          <View key={box} style={styles.box}>
            <View style={styles.row}>
              {renderCheckboxIcon(box)}
              {renderArrowIcon(box)}
            </View>

            {/* Check if content exists before rendering */}
            {contentByTheme[selectedTheme]?.[box] && renderContent(box, contentByTheme[selectedTheme][box])}
          </View>
        )
      ))}
    </View>
    );
  };
export default PhysicalHealth;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#DBE4E7',
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
  },
  introText: {
    marginBottom: 30,
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 10,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxText: {
    color: 'black',
    marginLeft: 8,
  },
  secondHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 10,
  },
  headerArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '93%',
  },
  arrowContainer: {
    marginLeft: 'auto',
  },
  arrowIcon: {
    marginLeft: 5,
    fontSize: 24,
  }, 
});
