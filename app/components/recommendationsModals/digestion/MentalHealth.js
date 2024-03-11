import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

const MentalHealth = ({ selectedTheme, userId }) => {
  // Define content based on the selectedTheme
  const contentByTheme = {
    Theme_Anxiety: {
      box1Header: 'Test',
      box1: 'Content specific to Anxiety...',
      box2Header: 'Test2',
      box2: 'Content specific...',
    },
    Theme_Fertility: {
      box1Header: 'Test',
      box1: 'Content specific to Fertility...',
      box2Header: 'Test2',
      box2: 'Content specific...',
    },
    Theme_Menopause: {
      box1Header: 'Test',
      box1: 'Content specific to Menopause...',
      box2Header: 'Test2',
      box2: 'Content specific...',
    },
    Theme_PMS: {
      box1Header: 'Test',
      box1: 'Content specific to PMS...',
      box2Header: 'Test2',
      box2: 'Content specific...',
    },
    Theme_SkinHair: {
      box1Header: 'Test',
      box1: 'Content specific to Skin & Hair...',
      box2Header: 'Test2',
      box2: 'Content specific...',
    },
    Theme_Sleep: {
      box1Header: 'Test',
      box1: 'Content specific to Sleep...',
      box2Header: 'Test2',
      box2: 'Content specific...',
    },
    Theme_StomachBowel: {
      progressbarTitle: 'Mage & tarm',
      introText: 'En frisk tarm spelar en avgörande roll för att stötta mental hälsa. Tarmen och hjärnan är förbundna genom en ömsesidig kommunikationsväg som kallas tarm-hjärnaxeln. Tarmen rymmer biljoner bakterier som bildar tarmmikrobiotan, vilken hjälper till att reglera olika fysiologiska processer, inklusive produktionen av signalsubstanser som serotonin, dopamin och GABA, som är viktiga för att reglera ditt humör. Dessutom påverkar tarmmikrobiotan immunsystemet och inflammationsnivåerna i kroppen som båda är kopplade till psykiska hälsotillstånd som ångest och depression.',
      box1Header: 'Andningsövning',
      box1: 'Att återansluta, vila och lugna systemet är nyckeln till läkning, särskilt för matsmältningen.\n\n Försök att göra följande andningsövning minst 2 gånger om dagen i 5 minuter varje gång. Det är bra att öva innan du går och lägger dig och när du vaknar. Om möjligt, försök öka antalet gånger du gör detta dagligen.\n\n Hitta en bekväm sittande eller liggande position på en lugn plats. Andas in djupt genom näsan och ner i magen medan du räknar till 4. Håll andan och räkna till 6. Andas ut långsamt genom munnen med puckereda läppar (som genom ett sugrör) och räkna till 8.\n\n Det kan verka lite svårt i början, men att öva några andetag om dagen kommer att ge dig ett lugn samt positiv effekt på nervus vagus (kranial nerv X). När vi tonifierar denna nerv kan vi förbättra och reglera matsmältningen.',
      box2Header: 'Massage',
      box2: 'Lägg dig ner på en varm och bekvämt plats för att utföra massageövningen.  Den här övningen förbättrar blodcirkulationen till matsmältningsorganen och tarmarna och förbättrar leverns funktion.\n\n Gör så här: \n\n\u2022 Gnugga ricinolja över hela magen\n\n\u2022 Täck magen med en ren trasa eller använd ett medicinsk varmbandage\n\n\u2022 Vira en ren handduk runt din mage för att ytterligare isolera det\n\n\u2022 Placera en varmvattenflaska eller en värmedyna på handduken och håll den på magen i 45 minuter\n ',   
    },
    Theme_Stress: {
      box1Header: 'Test',
      box1: 'Content specific to Stress...',
      box2Header: 'Test2',
      box2: 'Content specific...',
    },
    Theme_Mjälte: {
      introText: 'Eftersom överanalyserande, oro och ältande av  tankar kan skada mjältens energi är det bra att hitta enkla verktyg i din vardag för att hantera det, som exempelvis att föra dagbok eller att göra mindfulness- och andningsövningar.',
      progressbarTitle: 'Mitt hälsopaket',
      box1Header: 'Medvetet ätande',
      box1: 'Medvetenhet när man äter innebär att helt fokusera på upplevelsen av att äta, att vara närvarande i nuet och engagera alla dina sinnen. ',
      box2Header: 'Skriva dagbok',
      box2: 'Ett sätt att hjälpa till att ta bort oro och överanalyserande är att skriva dagbok. Ett enkelt och kraftfullt sätt att göra detta är genom att skriva några sidor varje morgon.\n',   
      box3Header: 'Andningsövning',
      box3: 'Boxandas är en avslappningsteknik som innebär djup, kontrollerad andning för att främja avslappning och minska stress.\n\nFörsök att göra denna övning minst 2-3 gånger om dagen.',   
    },
    Theme_Lever: {
      introText: 'Kronisk stress kan utarma yin och påverka levern negativt. Att meditera, yoga och göra mindfulness-övningar kan hjälpa till att förbättra leverenergin. ',
      progressbarTitle: 'Mitt hälsopaket',
      box1Header: 'Morning Pages',
      box1: 'Ett bra sätt att hålla leverns energi levande och frisk är att uttrycka sina känslor o tankar i ord. Att skriva "morning pages" är en bra dagboksmetod som kan hjälpa till att kanalisera stress och kan bidra till att omvandla negativa och oroande tankar.\n\nKonceptet med morning pages är enkelt. Varje morgon när du vaknar, innan du hunnit göra nåt annat, ta fram din skrivbok och skriv tre sidor med allt som snurrar i huvudet. Det kanske känns svårt komma igång, men själva syftet med detta är att tömma huvudet på alla tankar och känslor, och få ut dom till pappret.',
      box2Header: 'Ricinoljepaket',
      box2: 'Ricinolja används för att stödja optimerad leverfunktion, förbättra avgiftning och hormonbalans samt minska inflammation i levern.',   
      box3Header: 'Andningsövning',
      box3: 'Andningen är avgörande för att hålla ned kroppens stressnivå. En andningsövning varje dag lugnar en stressad kropp. Snabbt och enkelt!',   
    },
    Theme_Njure: {
      introText: 'Eftersom njurarnas energi är relaterad till förmågan att manifestera och "viljan" och "viljestyrkan" finns det olika mindfulness- och visualiseringsövningar som är kraftfulla för att bygga upp njurarnas energi och stödja mental hälsa inom ramen för njurarna.\n\n Att praktisera mindfulness innebär att vara fullständigt närvarande i stunden och iaktta dina tankar och känslor utan att döma dem. Detta kan hjälpa till att odla en känsla av inre styrka och motståndskraft och stödja "viljan."',
      progressbarTitle: 'Mitt hälsopaket',
      box1Header: 'Medvetandepraxis ',
      box1: 'Video',
      box2Header: 'Visualiseringsövning',
      box2: 'Engagera dig i visualiseringar som fokuserar på att stärka njurarnas energi och förbättra din viljestyrka. Tänk dig en levande blå ljus eller visualisera dig själv som stark och beslutsam. Att visualisera dina avsikter och mål är en viktig del av manifestationen och att stärka din "vilja."\n\nDet bygger din motivation att ta nödvändiga åtgärder varje dag. \nDet aktiverar ditt undermedvetna sinne för att hjälpa dig tro att du är tillräcklig och förtjänar det du vill ha. \nDet programmerar din hjärna att hitta de resurser, verktyg och färdigheter som behövs för att förverkliga dina drömmar och mål. \nDet är en form av meditation som minskar stress genom att aktivera din avslappningsrespons.',   
      box3Header: 'Affirmationer',
      box3: 'Upprepa positiva affirmationer som stämmer överens med dina personliga mål och aspirationer. Affirmationer kan hjälpa till att omformulera negativa tankar och förstärka en positiv mental inställning, vilket stöder ”viljan.”  Exempel?',   
    },
    Theme_Qi: {
      progressbarTitle: 'Mitt hälsopaket',
    },
    Theme_Bra: {
      progressbarTitle: 'Mitt hälsopaket',
    },
    // Add more themes as needed
  };

  const content = contentByTheme[selectedTheme] || {};

  const [expandedBoxes, setExpandedBoxes] = useState({
    box1: false,
    box2: false,
    box3: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(getFirestore(), 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setExpandedBoxes(userData.expandedBoxes || {});
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const toggleBox = async (box, isHeartIcon) => {
    const headerKey = `${box}Header`;
  
    if (isHeartIcon) {
      try {
        const userDocRef = doc(getFirestore(), 'users', userId, 'themes', selectedTheme);
        await setDoc(
          userDocRef,
          {
            [box]: contentByTheme[selectedTheme][box], // Save the content
            [headerKey]: contentByTheme[selectedTheme][headerKey], // Save the header
          },
          { merge: true } // Add the merge option to update specific fields without overwriting the entire document
        );
  
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
  
  
  const renderContent = (box, fullText) => {
    return (
      <View style={styles.content}>
        {expandedBoxes[box] && <Text style={styles.text}>{fullText}</Text>}
      </View>
    );
  };

  const renderArrowIcon = (box) => {
    return expandedBoxes[box] ? (
      <Icon name="keyboard-arrow-up" style={styles.arrowIcon} />
    ) : (
      <Icon name="keyboard-arrow-down" style={styles.arrowIcon} />
    );
  };

  return (
    <View style={styles.wrapper}>
      {content.progressbarTitle && <Text>{content.progressbarTitle}</Text>}
      <View style={styles.introText}>
        <Text style={styles.header}>Mental hälsa</Text>
        {content.introText && <Text>{content.introText}</Text>}
      </View>

      {['box1', 'box2', 'box3'].map((box) => (
  // Check if the box is defined in contentByTheme[selectedTheme]
  contentByTheme[selectedTheme]?.[box] && (
    <View key={box} style={styles.box}>
      
        <View style={styles.row}>
          <TouchableOpacity onPress={() => toggleBox(box, true)}>
            <Text style={styles.icon}>
              <Icon name="favorite" style={styles.heartIcon} />
            </Text>
          </TouchableOpacity>
          <Text style={styles.secondHeader}>
            {contentByTheme[selectedTheme]?.[`${box}Header`] || ''}
          </Text>
        <TouchableOpacity onPress={() => toggleBox(box, false)}>
          <View style={styles.row}>
            {renderArrowIcon(box)}
          </View>
        </TouchableOpacity>
      </View>

      {/* Check if content exists before rendering */}
      {contentByTheme[selectedTheme]?.[box] && (
        <View style={styles.content}>
          {expandedBoxes[box] && <Text style={styles.text}>{contentByTheme[selectedTheme][box]}</Text>}
        </View>
      )}
    </View>
  )
))}

    </View>
  );
};


const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#E1D8CE',
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
  icon: {
    marginRight: 10,
  },
  heartIcon: {
    fontSize: 24,
    color: 'lightgrey',
  },
  secondHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  content: {
    marginTop: 10,
  },
  text: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowIcon: {
    marginLeft: 5,
    fontSize: 24,
  },
});

export default MentalHealth;
