
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  
  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full relative"
          aria-label="Change language"
        >
          <Languages size={18} />
          <motion.span 
            className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-primary text-white rounded-full h-4 w-4 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {language === 'english' ? 'EN' : language === 'hindi' ? 'HI' : 'MR'}
          </motion.span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-fadeIn">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05
              }
            },
            exit: {}
          }}
        >
          <motion.div variants={itemVariants}>
            <DropdownMenuItem
              className={language === 'english' ? 'bg-muted' : ''}
              onClick={() => setLanguage('english')}
            >
              English
            </DropdownMenuItem>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <DropdownMenuItem
              className={language === 'hindi' ? 'bg-muted' : ''}
              onClick={() => setLanguage('hindi')}
            >
              हिंदी (Hindi)
            </DropdownMenuItem>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <DropdownMenuItem
              className={language === 'marathi' ? 'bg-muted' : ''}
              onClick={() => setLanguage('marathi')}
            >
              मराठी (Marathi)
            </DropdownMenuItem>
          </motion.div>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
