import React, { useCallback, useEffect, useState } from 'react';

import { increaseBattlesWon, increaseBattlesLost, increaseBattlesDrawn, increaseTotalCoins } from '../../services/playerStatisticsService';
import processDuelRewards from '../../services/processDuelRewards';
import { updateUserFromDB } from '../../services/databaseService';
import { useDuel } from '../../hooks/duel';
import { useAuth } from '../../hooks/auth';
import {
  ResultsPageContainer,
  ResultsContainer,
  ResultsText,
  ResultsSmallText,
  BackToMenuButton,
  BackToMenuButtonText,
} from './styles';

const Results: React.FC = () => {
  const { isVictorious, setDidDuelJustFinish, toggleIsDueling, currentDuel, isBattleDrawn } = useDuel();
  const { user, updateUser } = useAuth();
  const [reward, setReward] = useState(0);

  useEffect(() => {
    const playerLevel = currentDuel.me.ch.lvl;
    const opponentLevel = currentDuel.op?.ch.lvl || 1;

    const modifier = playerLevel > opponentLevel ? -10 : (playerLevel === opponentLevel ? 0 : 10);
    const duelReward = (isBattleDrawn ? 35 : isVictorious ? 50 : 20) + modifier;
    const diamonds = isVictorious ? 10 : 0;

    let updatedUser = processDuelRewards(user, duelReward, duelReward, diamonds);
    updatedUser = increaseTotalCoins(updatedUser, duelReward);

    if (isBattleDrawn) {
      updatedUser = increaseBattlesDrawn(updatedUser);
    } else if (isVictorious) {
      updatedUser = increaseBattlesWon(updatedUser);
    } else {
      updatedUser = increaseBattlesLost(updatedUser);
    }

    updateUser({...updatedUser});
    updateUserFromDB({...updatedUser});
    setReward(duelReward);
  }, []);

  const renderResultsText = useCallback(() => {
    return (isBattleDrawn ? 'Empate!' : isVictorious ? 'Você venceu!' : 'Você perdeu :(');
  }, [isVictorious, isBattleDrawn]);

  const renderReward = useCallback(() => {
    return (
      <>
        <ResultsSmallText>+{reward} exp</ResultsSmallText>
        <ResultsSmallText>+{reward} moedas</ResultsSmallText>
        {isVictorious ? <ResultsSmallText>+10 diamantes</ResultsSmallText> : null}
      </>
    );
  }, [reward, isVictorious]);

  return (
    <ResultsPageContainer>
      <ResultsContainer>
        <ResultsText>{renderResultsText()}</ResultsText>
        {renderReward()}
        <BackToMenuButton onPress={() => {setDidDuelJustFinish(false); toggleIsDueling()}}>
          <BackToMenuButtonText>Voltar para menu principal</BackToMenuButtonText>
        </BackToMenuButton>
      </ResultsContainer>
    </ResultsPageContainer>
  );
};

export default Results;
