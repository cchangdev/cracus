import { Box, Flex, ButtonGroup, Button } from "@chakra-ui/react";

const Rating = ({activeRating, onRatingClick}) => {
    const RATINGS = {
        G: 'g',
        PG: 'pg',
        'PG-13': 'pg-13',
        '(Call H)R': 'r',
    };

    return (
        <Flex align="center" justify="space-between" mt={6} mb={6}>
            <Flex align="center">
                <Box displey="inline-block" mr={4}>Max Rating:</Box>
                <ButtonGroup>
                    {Object.keys(RATINGS).map(ratingKey => (
                    <Button
                        colorScheme="teal"
                        onClick={() => onRatingClick(RATINGS[ratingKey])}
                        key={ratingKey}
                        isActive={activeRating === RATINGS[ratingKey]}
                        variant={activeRating === ratingKey ? "solid" : "outline"}
                    >
                        {ratingKey}
                    </Button>
                    ))}
                </ButtonGroup>
            </Flex>
        </Flex>
    )
}

export default Rating