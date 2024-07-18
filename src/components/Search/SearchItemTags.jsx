
import { Flex } from 'antd';
import TagsItem from '../TagsState/TagsItem';

const SearchItemTags = ({ edition, foil }) => {

  const extendedArt = edition.frame_effects?.includes('extendedart') ? true : false
  const showcase = edition.frame_effects?.includes('showcase') ? true : false
  const borderless = edition.border_color === 'borderless' ? true : false
  const promo = edition.promo ? true : false
  const portrait = edition.promo_types?.includes('portrait') ? true : false

  return (
    <Flex gap={4} style={{ flexWrap: 'wrap'}}>
      {extendedArt && <TagsItem text='Extended Art' color='success' size={14} />}
      {showcase && <TagsItem text='Showcase' color='blue' size={14} />}
      {borderless && <TagsItem text='Borderless' color='orange' size={14} />}
      {promo && <TagsItem text='Promo' color='cyan' size={14} />}
      {foil ? <TagsItem emoji='✨' text='Foil' color='gold' size={14} /> : null}
      {portrait && <TagsItem text='Portrait' color='magenta' size={14} />}
    </Flex>
  );
}

export default SearchItemTags;