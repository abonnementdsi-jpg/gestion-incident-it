import React, { useState, useEffect, useCallback } from 'react';
import {
  ThemeProvider,
  createTheme,
  useTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Tab,
  Tabs,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  Snackbar,
  CircularProgress,
  Grid,
  LinearProgress,
  Menu,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  SwipeableDrawer,
  Fab,
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Slide,
  CardActions,
  Collapse,
  Avatar,
  InputAdornment,
  Switch,
  FormControlLabel,
  Tooltip,
  Badge
} from '@mui/material';
import {
  Add as AddIcon,
  Assignment as AssignmentIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
  ExitToApp as LogoutIcon,
  Assessment as ReportIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Dashboard as DashboardIcon,
  Download as DownloadIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  PriorityHigh as PriorityIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
  Password as PasswordIcon,
  PersonAdd as PersonAddIcon,
  Delete as DeleteIcon,
  Schedule as ScheduleIcon,
  Timer as TimerIcon,
  TrendingUp as TrendingUpIcon,
  Inventory as InventoryIcon,
  Computer as ComputerIcon,
  Print as PrintIcon,
  DevicesOther as DevicesIcon,
  Router as RouterIcon,
  Memory as MemoryIcon,
  Upload as UploadIcon,
  FileDownload as FileDownloadIcon,
  Build as BuildIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { createClient } from '@supabase/supabase-js';

// Configuration Supabase avec validation
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabaseAdmin = createClient(
  supabaseUrl, 
  process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY
);

// Validation des variables d'environnement
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Variables d\'environnement Supabase manquantes!');
  console.error('REACT_APP_SUPABASE_URL:', supabaseUrl ? 'Définie' : 'Manquante');
  console.error('REACT_APP_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Définie' : 'Manquante');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Debug: Log de la configuration Supabase
console.log('Configuration Supabase:', {
  url: supabaseUrl,
  keyLength: supabaseAnonKey?.length || 0
});

// Thème Material UI amélioré
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
    },
    error: {
      main: '#d32f2f',
      light: '#f44336',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

// Types de demandes
const LOCATIONS = [
  "Rez-de-chaussée – Imagerie médicale",
  "Rez-de-chaussée – Salle de scanner",
  "Rez-de-chaussée – Salle de radiographie",
  "Rez-de-chaussée – Salle de permanence d'imagerie médicale",
  "Rez-de-chaussée – Salle Akanda",
  "Urgences – Salle de permanence médecins",
  "Urgences – Petite infirmerie",
  "Urgences – Salle d'hospitalisation Addis Abeba",
  "Urgences – Bureau de consultation Johannesburg",
  "Urgences – Bureau de consultation Mayumba",
  "Urgences – Bureau de consultation Gambas",
  "Urgences – Bureau de consultation Lekoni",
  "Urgences – Salle de prélèvement",
  "Urgences – Salle de prise de paramètres",
  "Urgences – Bureau Kango",
  "Pôle G1 – Accueil",
  "Pôle G1 – Guichet 1",
  "Pôle G1 – Guichet 2",
  "Pôle G1 – Guichet 3",
  "Pôle G1 – Guichet 4",
  "Pôle G1 – Guichet 5",
  "Pôle G1 – Guichet 6",
  "Pôle G1 – Bureau des entrées",
  "Pôle G1 – Service cotation",
  "Pôle G1 – Prélèvement 1",
  "Pôle G1 – Prélèvement 2",
  "Pôle G1 – Secrétariat médical",
  "Pôle G2 – Guichet 1",
  "Pôle G2 – Guichet 2",
  "Pôle G2 – Salle Lastourville",
  "Pôle G2 – Salle Lambaréné",
  "Pôle G2 – Salle Port-Gentil",
  "Pôle G2 – Salle Makokou",
  "Pôle G2 – Secrétariat médical",
  "Pôle G3 – Guichet 1",
  "Pôle G3 – Guichet 2",
  "Pôle G3 – Secrétariat médical",
  "Pôle G3 – Prélèvement 1",
  "Pôle G3 – Prélèvement 2",
  "Pôle G3 – Prélèvement 3",
  "Pôle G3 – Prélèvement 4",
  "Pôle G3 – Prélèvement 5",
  "Pôle G3 – Salle des techniques laboratoire – Bureau",
  "Pôle G3 – Salle des techniques laboratoire – Biochimie",
  "Pôle G3 – Salle des techniques laboratoire – Sérologie / Immunologie",
  "Pôle G3 – Salle des techniques laboratoire – Hématologie",
  "Pôle G3 – Salle des techniques laboratoire – Bactériologie",
  "Pôle G3 – Salle de tri",
  "Pôle G3 – Salle d'anapath (hors fonction)",
  "1er étage – Salle d'infirmerie",
  "1er étage – Chambre Woleu",
  "1er étage – Chambre Ntem",
  "1er étage – Chambre Mpassa",
  "1er étage – Chambre Lolo",
  "1er étage – Chambre Ngounié",
  "1er étage – Espace service de maternité et blocs",
  "2e étage – Salle d'infirmerie",
  "2e étage – Chambre Ogooué",
  "2e étage – Chambre Komo",
  "2e étage – Chambre Nyanga",
  "2e étage – Chambre Ivindo",
  "2e étage – Chambre Abanga",
  "2e étage – Chambre Mbei",
  "2e étage – Salle de Méo",
  "Pôle G4 – Salle Okondja",
  "Pôle G4 – Salle Ndendé",
  "Pôle G4 – Salle Mbigou",
  "Pôle G4 – Salle Ntoume",
  "Pôle G4 – Salle Fougamou",
  "Pôle G4 – Secrétariat médical",
  "Service Comptabilité et caisse – Mezzanine au-dessus de Optika",
  "Direction – Bureau Ressources humaines",
  "Direction – Bureau Responsable administratif et financier",
  "Direction – Bureau de la Direction des opérations",
  "Direction – Assistance de direction",
  "Direction – Bureau PDG"
];

const INCIDENT_TYPES = [
  "Problème d'imprimante",
  "Demande liée à Santymed",
  "Problème de réseau",
  "Demande liée à Q-Gabon",
  "Problème de fiches de paillasses",
  "Problème au niveau des automates",
  "Problème Pack Office",
  "Problème Call Center",
  "Demande de maintenance d'ordinateur",
  "Problème lié au téléphone de service",
  "Demande de création de compte Gmail",
  "Autre demande"
];

const ORDER_TYPES = [
  "Ordinateur All in One",
  "Ordinateur portable",
  "Chargeur pour ordinateur",
  "Câble USB pour imprimante",
  "Câble HDMI",
  "Clavier",
  "Souris",
  "Cartouche d'encre pour imprimante HP",
  "Papier A4",
  "Papier A3",
  "Autre type de papier",
  "Téléphone portable",
  "Carte SIM",
  "Câble VGA",
  "Moniteur",
  "Unité centrale",
  "Multiprise",
  "Projecteur",
  "Tapis à souris",
  "Sac pour ordinateur",
  "Cartouche d'encre pour imprimante Epson",
  "Cartouche d'encre pour imprimante Canon",
  "Cartouche d'encre Xerox",
  "Papier pour imprimante Thermique",
  "Papier pour imprimante Phomemo",
  "Autre commande"
];

const SERVICES = [
  "IT",
  "RH",
  "Infirmerie",
  "Médecin",
  "Accueil et facturation",
  "Direction",
  "Laboratoire",
  "Comptabilité",
  "Cotation",
  "Stock",
  "Trésorerie et caisse"
];

// Constantes pour l'inventaire
const EQUIPMENT_TYPES = [
  "PC All-in-One",
  "PC Portable",
  "PC Tour",
  "Moniteur",
  "Imprimante",
  "Scanner",
  "Routeur",
  "Switch",
  "Serveur",
  "Tablette",
  "Téléphone IP",
  "Vidéoprojecteur",
  "Onduleur",
  "Disque dur externe",
  "Autre"
];

const EQUIPMENT_STATUS = [
  "En service",
  "En panne",
  "En maintenance",
  "En stock",
  "Réformé",
  "Volé",
  "Perdu"
];

const ZONES = ["G1", "G2", "G3","Laboratoire", "G4", "Urgences", "Direction", "1er étage", "2e étage", "Rez-de-chaussée"];

// ========================================
// FONCTIONS UTILITAIRES POUR LES MÉTRIQUES TEMPORELLES
// ========================================

const calculateTimeMetrics = (requests) => {
  const completedRequests = requests.filter(req => req.status === 'termine' && req.completed_at);
  
  if (completedRequests.length === 0) {
    return {
      totalProcessed: 0,
      averageProcessingTime: 0,
      fastestResolution: 0,
      slowestResolution: 0,
      totalProcessingTime: 0
    };
  }

  const processingTimes = completedRequests.map(req => {
    const created = new Date(req.created_at);
    const completed = new Date(req.completed_at);
    return Math.round((completed - created) / (1000 * 60 * 60)); // en heures
  });

  const totalProcessingTime = processingTimes.reduce((sum, time) => sum + time, 0);
  const averageProcessingTime = Math.round(totalProcessingTime / processingTimes.length * 10) / 10;
  const fastestResolution = Math.min(...processingTimes);
  const slowestResolution = Math.max(...processingTimes);

  return {
    totalProcessed: completedRequests.length,
    averageProcessingTime,
    fastestResolution,
    slowestResolution,
    totalProcessingTime,
    processingTimes
  };
};

const formatDuration = (hours) => {
  if (hours < 24) {
    return `${hours}h`;
  } else {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0 ? `${days}j ${remainingHours}h` : `${days}j`;
  }
};

// Fonction pour obtenir l'icône selon le type d'équipement
const getEquipmentIcon = (type) => {
  switch (type) {
    case 'PC All-in-One':
    case 'PC Portable':
    case 'PC Tour':
      return <ComputerIcon />;
    case 'Moniteur':
      return <DevicesIcon />;
    case 'Imprimante':
    case 'Scanner':
      return <PrintIcon />;
    case 'Routeur':
    case 'Switch':
      return <RouterIcon />;
    case 'Serveur':
      return <MemoryIcon />;
    default:
      return <DevicesIcon />;
  }
};

// Fonction pour obtenir la couleur du statut d'équipement
const getEquipmentStatusColor = (status) => {
  switch (status) {
    case 'En service':
      return 'success';
    case 'En panne':
      return 'error';
    case 'En maintenance':
      return 'warning';
    case 'En stock':
      return 'info';
    case 'Réformé':
    case 'Volé':
    case 'Perdu':
      return 'default';
    default:
      return 'default';
  }
};

// ========================================
// COMPOSANTS EXTERNALISÉS
// ========================================

// Composant d'authentification
const AuthForm = React.memo(({ 
  authMode, 
  setAuthMode, 
  authData, 
  setAuthData, 
  handleAuth, 
  loading, 
  supabaseUrl, 
  supabaseAnonKey 
}) => (
  <Container maxWidth="sm">
    <Paper 
      elevation={6} 
      sx={{ 
        p: 4, 
        mt: 8, 
        borderRadius: 3,
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)'
      }}
    >
      {/* Logo du Centre Diagnostic */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <img 
          src="/logo-centre-diagnostic.png" 
          alt="Centre Diagnostic" 
          style={{ 
            height: '80px',
            maxWidth: '300px',
            objectFit: 'contain'
          }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </Box>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        Gestion d'Incidents IT
      </Typography>
      
      {/* Debug info en développement */}
      {process.env.NODE_ENV === 'development' && (
        <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
          Debug: Supabase {supabaseUrl ? 'OK' : 'ERROR'} | Key {supabaseAnonKey ? 'OK' : 'ERROR'}
        </Alert>
      )}
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={authMode === 'login' ? 0 : 1} onChange={(e, v) => setAuthMode(v === 0 ? 'login' : 'register')}>
          <Tab label="Connexion" />
          <Tab label="Inscription" />
        </Tabs>
      </Box>

      <form onSubmit={handleAuth}>
        <TextField
          fullWidth
          label="Adresse email"
          type="email"
          value={authData.email}
          onChange={(e) => setAuthData({...authData, email: e.target.value})}
          margin="normal"
          required
          sx={{ mb: 2 }}
        />
        
        {authMode === 'register' && (
          <>
            <TextField
              fullWidth
              label="Numéro de téléphone"
              value={authData.phone}
              onChange={(e) => setAuthData({...authData, phone: e.target.value})}
              margin="normal"
              sx={{ mb: 2 }}
            />
            
            <FormControl fullWidth margin="normal" required sx={{ mb: 2 }}>
              <InputLabel id="service-signup-label">Service</InputLabel>
              <Select
                labelId="service-signup-label"
                id="service-signup-select"
                value={authData.service}
                label="Service"
                onChange={(e) => setAuthData({...authData, service: e.target.value})}
              >
                {SERVICES.map(service => (
                  <MenuItem key={service} value={service}>{service}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
        
        <TextField
          fullWidth
          label="Mot de passe"
          type="password"
          value={authData.password}
          onChange={(e) => setAuthData({...authData, password: e.target.value})}
          margin="normal"
          required
          sx={{ mb: 3 }}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ 
            mt: 2, 
            mb: 2,
            py: 1.5,
            fontSize: '1.1rem',
            boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
            }
          }}
        >
          {loading ? 'Chargement...' : (authMode === 'login' ? 'Se connecter' : 'Créer mon compte')}
        </Button>
      </form>
    </Paper>
  </Container>
));

// Nouveau composant pour la gestion de l'inventaire
// --- INVENTAIRE : version optimisée (pagination serveur + debounce + responsive) ---
const InventoryManagementTab = React.memo(({ 
  showSnackbar,
  user
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Etat UI / data
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Filtres & recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterZone, setFilterZone] = useState('');

  // Pagination & tri
  const [page, setPage] = useState(0);         // 0-based
  const [pageSize, setPageSize] = useState(isMobile ? 10 : 20);
  const [total, setTotal] = useState(0);
  const [orderBy, setOrderBy] = useState({ column: 'created_at', ascending: false });

  // Edition
  const [editMode, setEditMode] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [formData, setFormData] = useState({
    serial_number: '',
    label: '',
    brand_model: '',
    mac_ip: '',
    zone: '',
    sub_zone: '',
    status: 'En service',
    equipment_type: '',
    purchase_date: '',
    warranty_end: '',
    assigned_to: '',
    notes: ''
  });

  // Debounce recherche
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Récupération paginée
  const fetchInventory = useCallback(async () => {
    setLoading(true);
    try {
      const from = page * pageSize;
      const to   = from + pageSize - 1;

      let query = supabase
        .from('inventory')
        .select('*', { count: 'exact' })
        .order(orderBy.column, { ascending: orderBy.ascending })
        .range(from, to);

      if (debouncedSearch) {
        // multi-champs
        query = query.or(
          `serial_number.ilike.%${debouncedSearch}%,label.ilike.%${debouncedSearch}%,brand_model.ilike.%${debouncedSearch}%,mac_ip.ilike.%${debouncedSearch}%`
        );
      }
      if (filterStatus) query = query.eq('status', filterStatus);
      if (filterZone)   query = query.eq('zone', filterZone);

      const { data, error, count } = await query;
      if (error) throw error;
      setRows(data || []);
      setTotal(count ?? 0);
    } catch (err) {
      console.error('Erreur inventaire:', err);
      showSnackbar('Erreur lors de la récupération de l’inventaire', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, orderBy, debouncedSearch, filterStatus, filterZone, showSnackbar]);

  useEffect(() => { fetchInventory(); }, [fetchInventory]);

  // Reset page quand filtres / recherche changent
  useEffect(() => { setPage(0); }, [debouncedSearch, filterStatus, filterZone]);

  // Dialogs
  const handleOpenDialog = (item = null) => {
    if (item) {
      setFormData({
        ...item,
        purchase_date: item.purchase_date || '',
        warranty_end:  item.warranty_end  || '',
      });
      setEditMode(true);
    } else {
      setFormData({
        serial_number: '',
        label: '',
        brand_model: '',
        mac_ip: '',
        zone: '',
        sub_zone: '',
        status: 'En service',
        equipment_type: '',
        purchase_date: '',
        warranty_end: '',
        assigned_to: '',
        notes: ''
      });
      setEditMode(false);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedItem(null);
    setEditMode(false);
  };

  // Sauvegarde
  const handleSaveEquipment = async () => {
    try {
      setLoading(true);
      if (!formData.serial_number || !formData.label) {
        showSnackbar('Le numéro de série et le libellé sont obligatoires', 'error');
        return;
      }

      const dataToSave = {
        serial_number: formData.serial_number,
        label:         formData.label,
        brand_model:   formData.brand_model || null,
        mac_ip:        formData.mac_ip || null,
        zone:          formData.zone || null,
        sub_zone:      formData.sub_zone || null,
        status:        formData.status || 'En service',
        equipment_type:formData.equipment_type || null,
        purchase_date: formData.purchase_date || null,
        warranty_end:  formData.warranty_end || null,
        assigned_to:   formData.assigned_to || null,
        notes:         formData.notes || null
      };

      if (editMode && formData.id) {
        const { error } = await supabase
          .from('inventory')
          .update({
            ...dataToSave,
            updated_by: user?.id || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', formData.id);
        if (error) throw error;
        showSnackbar('Équipement mis à jour avec succès !', 'success');
      } else {
        const { error } = await supabase
          .from('inventory')
          .insert([{
            ...dataToSave,
            created_by: user?.id || null
          }]);
        if (error) throw error;
        showSnackbar('Équipement ajouté avec succès !', 'success');
      }

      handleCloseDialog();
      fetchInventory();
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      showSnackbar('Erreur lors de la sauvegarde de l’équipement', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Suppression
  const handleDeleteEquipment = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.from('inventory').delete().eq('id', itemToDelete.id);
      if (error) throw error;
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      showSnackbar('Équipement supprimé avec succès !', 'success');
      // Rester sur la même page, mais recharger
      fetchInventory();
    } catch (error) {
      console.error('Erreur suppression:', error);
      showSnackbar('Erreur lors de la suppression', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Stats (client)
  const stats = {
    total: rows.length ? total : total, // total global
    enService: rows.filter(i => i.status === 'En service').length,
    enPanne: rows.filter(i => i.status === 'En panne').length,
    enMaintenance: rows.filter(i => i.status === 'En maintenance').length,
    enStock: rows.filter(i => i.status === 'En stock').length,
  };

  // Rendu cartes (mobile)
  const MobileCards = () => (
    <Box sx={{ display: 'grid', gap: 1.5 }}>
      {rows.length === 0 ? (
        <Card sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {debouncedSearch || filterStatus || filterZone
              ? 'Aucun équipement ne correspond à votre recherche'
              : 'Aucun équipement trouvé'}
          </Typography>
        </Card>
      ) : rows.map(item => (
        <Card key={item.id} elevation={2} sx={{ borderRadius: 2 }}>
          <CardContent sx={{ pb: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Chip label={item.serial_number} size="small" sx={{ fontWeight: 600 }}/>
              <Chip label={item.status} color={getEquipmentStatusColor(item.status)} size="small"/>
            </Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: .5 }}>
              {item.label}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {item.equipment_type || 'Type inconnu'} • {item.brand_model || 'Modèle N/A'}
            </Typography>
            <Box sx={{ mt: 1, display: 'grid', gap: .25 }}>
              <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                MAC/IP: {item.mac_ip || 'N/A'}
              </Typography>
              <Typography variant="caption">Zone: {item.zone || 'N/A'} · Sous-zone: {item.sub_zone || 'N/A'}</Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
            <Box sx={{ display: 'flex', gap: .5 }}>
              <IconButton size="small" onClick={() => setSelectedItem(item)}>
                <ViewIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => handleOpenDialog(item)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => { setItemToDelete(item); setDeleteDialogOpen(true); }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </CardActions>
        </Card>
      ))}
    </Box>
  );

  // Helpers table tri
  const headerCell = (label, columnKey) => (
    <TableCell
      sx={{ color: 'white', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
      onClick={() => {
        setOrderBy(prev => ({
          column: columnKey,
          ascending: prev.column === columnKey ? !prev.ascending : true
        }));
      }}
    >
      {label}{' '}
      {orderBy.column === columnKey ? (orderBy.ascending ? '▲' : '▼') : ''}
    </TableCell>
  );

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <Box>
      {/* Titre + actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Gestion de l'Inventaire Informatique
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={() => {
              // export CSV des lignes visibles (page courante)
              const headers = ['Numéro de série','Libellé','Marque/Modèle','MAC/IP','Zone','Sous-zone','État','Type','Assigné à','Notes'];
              const csv = [
                headers.join(','),
                ...rows.map(item => [
                  item.serial_number,
                  item.label,
                  item.brand_model || '',
                  item.mac_ip || '',
                  item.zone || '',
                  item.sub_zone || '',
                  item.status || '',
                  item.equipment_type || '',
                  item.assigned_to || '',
                  (item.notes || '').replace(/,/g,';')
                ].join(','))
              ].join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = `inventaire_page_${page+1}_${new Date().toISOString().split('T')[0]}.csv`;
              link.click();
              showSnackbar('Export CSV réussi !', 'success');
            }}
          >
            Export CSV
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Nouvel Équipement
          </Button>
        </Box>
      </Box>

      {/* Statistiques rapides (sur la page courante) */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} md={3}><Card><CardContent><Typography variant="caption">Total (bdd)</Typography><Typography variant="h4" sx={{ fontWeight:700 }}>{total}</Typography></CardContent></Card></Grid>
        <Grid item xs={6} md={3}><Card><CardContent><Typography variant="caption">En service</Typography><Typography variant="h5">{stats.enService}</Typography></CardContent></Card></Grid>
        <Grid item xs={6} md={3}><Card><CardContent><Typography variant="caption">En panne</Typography><Typography variant="h5">{stats.enPanne}</Typography></CardContent></Card></Grid>
        <Grid item xs={6} md={3}><Card><CardContent><Typography variant="caption">En stock</Typography><Typography variant="h5">{stats.enStock}</Typography></CardContent></Card></Grid>
      </Grid>

      {/* Barre de recherche + filtres */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Rechercher par n° série, libellé, marque, IP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchTerm('')}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Filtrer par statut</InputLabel>
              <Select
                value={filterStatus}
                label="Filtrer par statut"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="">Tous</MenuItem>
                {EQUIPMENT_STATUS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Filtrer par zone</InputLabel>
              <Select
                value={filterZone}
                label="Filtrer par zone"
                onChange={(e) => setFilterZone(e.target.value)}
              >
                <MenuItem value="">Toutes</MenuItem>
                {ZONES.map(z => <MenuItem key={z} value={z}>{z}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => { setSearchTerm(''); setFilterStatus(''); setFilterZone(''); }}
              startIcon={<ClearIcon />}
            >
              Réinitialiser
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Contenu */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress/></Box>
      ) : isMobile ? (
        <MobileCards />
      ) : (
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                {headerCell('N° Série', 'serial_number')}
                {headerCell('Type', 'equipment_type')}
                {headerCell('Libellé', 'label')}
                {headerCell('Marque/Modèle', 'brand_model')}
                {headerCell('MAC/IP', 'mac_ip')}
                {headerCell('Zone', 'zone')}
                {headerCell('Sous-zone', 'sub_zone')}
                {headerCell('Statut', 'status')}
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">Aucun équipement trouvé</Typography>
                  </TableCell>
                </TableRow>
              ) : rows.map(item => (
                <TableRow key={item.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' }}}>
                  <TableCell><Typography variant="body2" sx={{ fontWeight: 600 }}>{item.serial_number}</Typography></TableCell>
                  <TableCell>{item.equipment_type || 'N/A'}</TableCell>
                  <TableCell>{item.label}</TableCell>
                  <TableCell>{item.brand_model || 'N/A'}</TableCell>
                  <TableCell><Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{item.mac_ip || 'N/A'}</Typography></TableCell>
                  <TableCell>{item.zone || 'N/A'}</TableCell>
                  <TableCell>{item.sub_zone || 'N/A'}</TableCell>
                  <TableCell><Chip label={item.status} color={getEquipmentStatusColor(item.status)} size="small" sx={{ fontWeight: 500 }}/></TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: .5 }}>
                      <Tooltip title="Voir les détails">
                        <IconButton size="small" onClick={() => setSelectedItem(item)}>
                          <ViewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Modifier">
                        <IconButton size="small" onClick={() => handleOpenDialog(item)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton
                          size="small"
                          onClick={() => { setItemToDelete(item); setDeleteDialogOpen(true); }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mt: 2, flexWrap: 'wrap' }}>
        <Typography variant="caption" color="text.secondary">
          {(page * pageSize) + 1}-{Math.min((page+1)*pageSize, total)} sur {total}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            select
            label="Lignes"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            size="small"
            sx={{ width: 110 }}
          >
            {[10,20,50,100].map(n => <MenuItem key={n} value={n}>{n}/page</MenuItem>)}
          </TextField>
          <Button variant="outlined" size="small" onClick={() => setPage(0)} disabled={page === 0}>{'<<'}</Button>
          <Button variant="outlined" size="small" onClick={() => setPage(p => Math.max(0, p-1))} disabled={page === 0}>Précédent</Button>
          <Typography variant="body2">Page {page+1}/{totalPages}</Typography>
          <Button variant="outlined" size="small" onClick={() => setPage(p => Math.min(totalPages-1, p+1))} disabled={page >= totalPages-1}>Suivant</Button>
          <Button variant="outlined" size="small" onClick={() => setPage(totalPages-1)} disabled={page >= totalPages-1}>{'>>'}</Button>
        </Box>
      </Box>

      {/* Dialog Ajout/Edition */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ backgroundColor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <InventoryIcon />
            {editMode ? "Modifier l'équipement" : "Ajouter un nouvel équipement"}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2"><strong>Note :</strong> Seuls le numéro de série et le libellé sont obligatoires.</Typography>
          </Alert>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Numéro de série *" value={formData.serial_number} onChange={(e)=>setFormData({...formData, serial_number: e.target.value})} required />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Type d'équipement</InputLabel>
                <Select value={formData.equipment_type} label="Type d'équipement" onChange={(e)=>setFormData({...formData, equipment_type: e.target.value})}>
                  <MenuItem value="">Aucun</MenuItem>
                  {EQUIPMENT_TYPES.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Libellé / Description *" value={formData.label} onChange={(e)=>setFormData({...formData, label: e.target.value})} required />
            </Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Marque / Modèle" value={formData.brand_model} onChange={(e)=>setFormData({...formData, brand_model: e.target.value})}/></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Adresse MAC / IP" value={formData.mac_ip} onChange={(e)=>setFormData({...formData, mac_ip: e.target.value})}/></Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Zone</InputLabel>
                <Select value={formData.zone} label="Zone" onChange={(e)=>setFormData({...formData, zone: e.target.value})}>
                  <MenuItem value="">Aucune</MenuItem>
                  {ZONES.map(z => <MenuItem key={z} value={z}>{z}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Sous-zone / Bureau" value={formData.sub_zone} onChange={(e)=>setFormData({...formData, sub_zone: e.target.value})}/></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Assigné à" value={formData.assigned_to} onChange={(e)=>setFormData({...formData, assigned_to: e.target.value})}/></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Date d'achat" type="date" value={formData.purchase_date || ''} onChange={(e)=>setFormData({...formData, purchase_date: e.target.value})} InputLabelProps={{shrink:true}}/></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Fin de garantie" type="date" value={formData.warranty_end || ''} onChange={(e)=>setFormData({...formData, warranty_end: e.target.value})} InputLabelProps={{shrink:true}}/></Grid>
            <Grid item xs={12}><TextField fullWidth label="Notes" multiline rows={3} value={formData.notes} onChange={(e)=>setFormData({...formData, notes: e.target.value})}/></Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSaveEquipment} variant="contained" disabled={loading || !formData.serial_number || !formData.label}>
            {editMode ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de suppression */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: 'error.main', color: 'white' }}>Confirmer la suppression</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Alert severity="warning">Êtes-vous sûr de vouloir supprimer cet équipement ?</Alert>
          {itemToDelete && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1"><strong>N° Série :</strong> {itemToDelete.serial_number}</Typography>
              <Typography variant="body1"><strong>Libellé :</strong> {itemToDelete.label}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleDeleteEquipment} variant="contained" color="error" disabled={loading}>Supprimer</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Détails */}
      <Dialog open={!!selectedItem} onClose={() => setSelectedItem(null)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ backgroundColor: 'primary.main', color: 'white' }}>Détails de l'équipement</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedItem && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">N° Série</Typography><Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedItem.serial_number}</Typography></Grid>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Type</Typography><Typography variant="body1">{selectedItem.equipment_type || 'N/A'}</Typography></Grid>
              <Grid item xs={12}><Typography variant="subtitle2" color="text.secondary">Libellé</Typography><Typography variant="body1">{selectedItem.label}</Typography></Grid>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Marque/Modèle</Typography><Typography variant="body1">{selectedItem.brand_model || 'N/A'}</Typography></Grid>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">MAC/IP</Typography><Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{selectedItem.mac_ip || 'N/A'}</Typography></Grid>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Zone</Typography><Typography variant="body1">{selectedItem.zone || 'N/A'}</Typography></Grid>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Sous-zone</Typography><Typography variant="body1">{selectedItem.sub_zone || 'N/A'}</Typography></Grid>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Statut</Typography><Chip label={selectedItem.status} color={getEquipmentStatusColor(selectedItem.status)} sx={{ fontWeight: 500 }} /></Grid>
              <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Assigné à</Typography><Typography variant="body1">{selectedItem.assigned_to || 'N/A'}</Typography></Grid>
              {selectedItem.purchase_date && <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Date d'achat</Typography><Typography variant="body1">{new Date(selectedItem.purchase_date).toLocaleDateString('fr-FR')}</Typography></Grid>}
              {selectedItem.warranty_end  && <Grid item xs={12} md={6}><Typography variant="subtitle2" color="text.secondary">Fin de garantie</Typography><Typography variant="body1">{new Date(selectedItem.warranty_end).toLocaleDateString('fr-FR')}</Typography></Grid>}
              {selectedItem.notes && <Grid item xs={12}><Typography variant="subtitle2" color="text.secondary">Notes</Typography><Typography variant="body1">{selectedItem.notes}</Typography></Grid>}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedItem(null)}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});


const UsersManagementTab = React.memo(({ 
  profiles, 
  fetchProfiles, 
  showSnackbar 
}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  const fetchAllUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      showSnackbar('Erreur lors de la récupération des utilisateurs', 'error');
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleUpdateRole = async (userId, newRole) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
      
      if (error) throw error;
      
      await fetchAllUsers();
      showSnackbar('Rôle mis à jour avec succès !', 'success');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle:', error);
      showSnackbar('Erreur lors de la mise à jour du rôle', 'error');
    }
  };

  const handleResetPassword = async () => {
  if (!selectedUser || !newPassword) return;
  
  try {
    setLoading(true);
    
    if (newPassword.length < 8) {
      showSnackbar('Le mot de passe doit contenir au moins 8 caractères', 'error');
      return;
    }
    
    // ⚠️ Ceci nécessite supabaseAdmin avec la clé service_role
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      selectedUser.id,
      { password: newPassword }
    );
    
    if (error) throw error;
    
    setDialogOpen(false);
    setSelectedUser(null);
    setNewPassword('');
    showSnackbar(`Mot de passe mis à jour pour ${selectedUser.email}`, 'success');
    
  } catch (error) {
    console.error('Erreur:', error);
    showSnackbar('Erreur lors de la mise à jour du mot de passe', 'error');
  } finally {
    setLoading(false);
  }
};
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'error';
      case 'it': return 'warning';
      case 'user': return 'primary';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Gestion des Utilisateurs
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={fetchAllUsers}
          disabled={loading}
        >
          Actualiser
        </Button>
      </Box>

      <Alert 
        severity="info" 
        sx={{ 
          mb: 3, 
          borderRadius: 2,
          backgroundColor: 'primary.50',
          border: '1px solid',
          borderColor: 'primary.200'
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          <strong>Vue Administrateur :</strong> Gérez les utilisateurs, leurs rôles et réinitialisez leurs mots de passe.
        </Typography>
      </Alert>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Téléphone</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Service</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Rôle</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Date de création</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      Aucun utilisateur trouvé
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow 
                    key={user.id}
                    sx={{ 
                      '&:nth-of-type(odd)': { backgroundColor: 'action.hover' },
                      '&:hover': { backgroundColor: 'primary.50' }
                    }}
                  >
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || 'Non renseigné'}</TableCell>
                    <TableCell>{user.service}</TableCell>
                    <TableCell>
                      <FormControl size="small" sx={{ minWidth: 100 }}>
                        <Select
                          value={user.role}
                          onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                          sx={{ 
                            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                            backgroundColor: `${getRoleColor(user.role)}.50`,
                            borderRadius: 2
                          }}
                        >
                          <MenuItem value="user">Utilisateur</MenuItem>
                          <MenuItem value="it">Agent IT</MenuItem>
                          <MenuItem value="admin">Administrateur</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="Réinitialiser le mot de passe">
                          <IconButton
                            size="small"
                            color="warning"
                            onClick={() => {
                              setSelectedUser(user);
                              setDialogOpen(true);
                            }}
                            sx={{ 
                              backgroundColor: 'warning.50',
                              '&:hover': { backgroundColor: 'warning.100' }
                            }}
                          >
                            <PasswordIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog pour réinitialiser le mot de passe */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Réinitialiser le mot de passe
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="body1" gutterBottom>
                Utilisateur: <strong>{selectedUser.email}</strong>
              </Typography>
              <TextField
                fullWidth
                label="Nouveau mot de passe"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                margin="normal"
                required
                helperText="Le mot de passe doit contenir au moins 8 caractères"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Annuler
          </Button>
          <Button 
            onClick={handleResetPassword}
            variant="contained"
            disabled={loading || !newPassword || newPassword.length < 8}
          >
            {loading ? 'Mise à jour...' : 'Mettre à jour'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

// Composant principal des demandes avec recherche et filtres
const RequestsTab = React.memo(({ 
  profile, 
  requests, 
  setRequestDialog, 
  setSelectedRequest, 
  setDialogOpen, 
  handleTakeRequest, 
  handleCompleteRequest, 
  user, 
  getStatusColor, 
  getPriorityColor 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(isMobile ? 5 : 10);
  const [expandedCard, setExpandedCard] = useState(null);

  // États pour la recherche et les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    priority: '',
    service: '',
    location: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fonction de filtrage et recherche
  const filteredRequests = requests.filter(request => {
    // Recherche par numéro de ticket, catégorie ou description
    const matchesSearch = !searchTerm || 
      request.ticket_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtres
    const matchesFilters = 
      (!filters.type || request.type === filters.type) &&
      (!filters.status || request.status === filters.status) &&
      (!filters.priority || request.priority === filters.priority) &&
      (!filters.service || request.service_demandeur === filters.service) &&
      (!filters.location || request.location.includes(filters.location));

    return matchesSearch && matchesFilters;
  });

  // Calcul de la pagination
  const indexOfLastRequest = currentPage * rowsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - rowsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);

  // Fonctions de navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      if (isMobile) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if (isMobile) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      status: '',
      priority: '',
      service: '',
      location: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleExpandClick = (requestId) => {
    setExpandedCard(expandedCard === requestId ? null : requestId);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredRequests.length]);

  // Rendu mobile - Cartes avec recherche et filtres
  if (isMobile) {
    return (
      <Box sx={{ pb: 8 }}>
        {/* En-tête avec recherche */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.2rem' }}>
            {profile?.role === 'admin' ? 'Toutes les Demandes' : 
             profile?.role === 'it' ? 'Mes Demandes IT' : 
             'Mes Demandes'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {filteredRequests.length} demande(s) trouvée(s) sur {requests.length}
          </Typography>
        </Box>

        {/* Barre de recherche mobile */}
        <TextField
          fullWidth
          placeholder="Rechercher par n° ticket, catégorie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setSearchTerm('')}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Bouton filtres mobile */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Button
            variant={showFilters ? "contained" : "outlined"}
            startIcon={<FilterListIcon />}
            onClick={() => setShowFilters(!showFilters)}
            size="small"
          >
            Filtres
          </Button>
          {(Object.values(filters).some(f => f) || searchTerm) && (
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={clearFilters}
              size="small"
              color="error"
            >
              Effacer
            </Button>
          )}
        </Box>

        {/* Panel des filtres mobile */}
        <Collapse in={showFilters}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={filters.type}
                    label="Type"
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                  >
                    <MenuItem value="">Tous</MenuItem>
                    <MenuItem value="incident">Incident</MenuItem>
                    <MenuItem value="order">Commande</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Statut</InputLabel>
                  <Select
                    value={filters.status}
                    label="Statut"
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <MenuItem value="">Tous</MenuItem>
                    <MenuItem value="nouveau">Nouveau</MenuItem>
                    <MenuItem value="en_cours">En cours</MenuItem>
                    <MenuItem value="termine">Terminé</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Priorité</InputLabel>
                  <Select
                    value={filters.priority}
                    label="Priorité"
                    onChange={(e) => setFilters({...filters, priority: e.target.value})}
                  >
                    <MenuItem value="">Toutes</MenuItem>
                    <MenuItem value="basse">Basse</MenuItem>
                    <MenuItem value="moyenne">Moyenne</MenuItem>
                    <MenuItem value="urgente">Urgente</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Collapse>

        {/* Messages informatifs adaptés mobile */}
        {profile?.role === 'it' && (
          <Alert 
            severity="info" 
            sx={{ 
              mb: 2, 
              borderRadius: 2,
              fontSize: '0.85rem',
              '& .MuiAlert-message': { fontSize: '0.85rem' }
            }}
          >
            Vous voyez vos demandes + celles assignées
          </Alert>
        )}

        {/* Indicateur de pagination mobile */}
        {filteredRequests.length > 0 && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2,
            p: 1.5,
            backgroundColor: 'grey.100',
            borderRadius: 2,
            fontSize: '0.85rem'
          }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Page {currentPage}/{totalPages}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {indexOfFirstRequest + 1}-{Math.min(indexOfLastRequest, filteredRequests.length)} sur {filteredRequests.length}
            </Typography>
          </Box>
        )}

        {/* Cartes pour mobile */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {currentRequests.length === 0 ? (
            <Card sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {searchTerm || Object.values(filters).some(f => f) ? 
                  'Aucune demande ne correspond à votre recherche' : 
                  'Aucune demande trouvée'
                }
              </Typography>
            </Card>
          ) : (
            currentRequests.map((request) => (
              <Card 
                key={request.id} 
                elevation={3} 
                sx={{ 
                  borderRadius: 2,
                  ...(profile?.role === 'it' && request.assigned_to === user.id && request.user_id !== user.id && {
                    border: '2px solid',
                    borderColor: 'primary.main'
                  })
                }}
              >
                <CardContent sx={{ pb: 1 }}>
                  {/* En-tête de la carte avec numéro de ticket */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', flex: 1 }}>
                      <Chip
                        label={request.ticket_number}
                        color="default"
                        size="small"
                        sx={{ fontSize: '0.75rem', fontWeight: 600 }}
                      />
                      <Chip
                        icon={request.type === 'incident' ? <AssignmentIcon /> : <ShoppingCartIcon />}
                        label={request.type === 'incident' ? 'Incident' : 'Commande'}
                        color={request.type === 'incident' ? 'error' : 'success'}
                        size="small"
                        sx={{ fontSize: '0.75rem' }}
                      />
                      <Chip
                        label={request.status.replace('_', ' ')}
                        color={getStatusColor(request.status)}
                        size="small"
                        sx={{ fontSize: '0.75rem' }}
                      />
                      {profile?.role === 'it' && request.assigned_to === user.id && request.user_id !== user.id && (
                        <Chip
                          label="ASSIGNÉE"
                          size="small"
                          color="primary"
                          sx={{ fontSize: '0.7rem', height: '20px' }}
                        />
                      )}
                    </Box>
                  </Box>

                  {/* Contenu principal */}
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {request.category}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PriorityIcon sx={{ fontSize: 14 }} />
                      Priorité: <Chip label={request.priority} color={getPriorityColor(request.priority)} size="small" sx={{ height: '18px', fontSize: '0.7rem' }} />
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationIcon sx={{ fontSize: 14 }} />
                      {request.location}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <BusinessIcon sx={{ fontSize: 14 }} />
                      Service: {request.service_demandeur}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(request.created_at).toLocaleDateString('fr-FR')}
                    </Typography>
                  </Box>

                  {/* Description (collapsible) */}
                  <Collapse in={expandedCard === request.id} timeout="auto" unmountOnExit>
                    <Box sx={{ mt: 2, p: 1.5, backgroundColor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        Description:
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        {request.description}
                      </Typography>
                    </Box>
                  </Collapse>
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    onClick={() => handleExpandClick(request.id)}
                    endIcon={<ExpandMoreIcon sx={{ 
                      transform: expandedCard === request.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s'
                    }} />}
                  >
                    {expandedCard === request.id ? 'Moins' : 'Plus'}
                  </Button>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedRequest(request);
                        setDialogOpen(true);
                      }}
                      sx={{ 
                        backgroundColor: 'primary.50',
                        '&:hover': { backgroundColor: 'primary.100' }
                      }}
                    >
                      <ViewIcon fontSize="small" />
                    </IconButton>
                    
                    {profile && profile.role === 'it' && request.status === 'nouveau' && !request.assigned_to && (
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleTakeRequest(request.id)}
                        sx={{ 
                          backgroundColor: 'primary.50',
                          '&:hover': { backgroundColor: 'primary.100' }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    )}
                    
                    {profile && profile.role === 'it' && request.assigned_to === user.id && request.status === 'en_cours' && (
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => handleCompleteRequest(request.id)}
                        sx={{ 
                          backgroundColor: 'success.50',
                          '&:hover': { backgroundColor: 'success.100' }
                        }}
                      >
                        <CheckIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </CardActions>
              </Card>
            ))
          )}
        </Box>

        {/* Pagination mobile simplifiée */}
        {totalPages > 1 && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: 1, 
            mt: 3,
            p: 2,
            backgroundColor: 'grey.50',
            borderRadius: 2
          }}>
            <IconButton
              size="small"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <NavigateBeforeIcon />
            </IconButton>
            
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage === 1) {
                  pageNumber = i + 1;
                } else if (currentPage === totalPages) {
                  pageNumber = totalPages - 2 + i;
                } else {
                  pageNumber = currentPage - 1 + i;
                }

                return (
                  <Button
                    key={i}
                    variant={pageNumber === currentPage ? "contained" : "text"}
                    size="small"
                    onClick={() => setCurrentPage(pageNumber)}
                    sx={{ 
                      minWidth: 36,
                      fontSize: '0.85rem'
                    }}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </Box>

            <IconButton
              size="small"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <NavigateNextIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    );
  }

  // Rendu desktop - Tableau avec recherche et filtres
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {(() => {
            if (profile?.role === 'admin') {
              return 'Toutes les Demandes (Admin)';
            } else if (profile?.role === 'it') {
              return 'Mes Demandes & Assignations IT';
            } else {
              return 'Mes Demandes';
            }
          })()}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setRequestDialog(true)}
          size="large"
          sx={{ 
            boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
            px: 3,
            py: 1
          }}
        >
          Nouvelle Demande
        </Button>
      </Box>

      {/* Barre de recherche et filtres desktop */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Rechercher par n° ticket, catégorie, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchTerm('')}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={showFilters}
                onChange={(e) => setShowFilters(e.target.checked)}
              />
            }
            label="Filtres"
          />
        </Box>

        <Collapse in={showFilters}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2.4}>
              <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select
                  value={filters.type}
                  label="Type"
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <MenuItem value="">Tous</MenuItem>
                  <MenuItem value="incident">Incident</MenuItem>
                  <MenuItem value="order">Commande</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2.4}>
              <FormControl fullWidth size="small">
                <InputLabel>Statut</InputLabel>
                <Select
                  value={filters.status}
                  label="Statut"
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <MenuItem value="">Tous</MenuItem>
                  <MenuItem value="nouveau">Nouveau</MenuItem>
                  <MenuItem value="en_cours">En cours</MenuItem>
                  <MenuItem value="termine">Terminé</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2.4}>
              <FormControl fullWidth size="small">
                <InputLabel>Priorité</InputLabel>
                <Select
                  value={filters.priority}
                  label="Priorité"
                  onChange={(e) => setFilters({...filters, priority: e.target.value})}
                >
                  <MenuItem value="">Toutes</MenuItem>
                  <MenuItem value="basse">Basse</MenuItem>
                  <MenuItem value="moyenne">Moyenne</MenuItem>
                  <MenuItem value="urgente">Urgente</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2.4}>
              <FormControl fullWidth size="small">
                <InputLabel>Service</InputLabel>
                <Select
                  value={filters.service}
                  label="Service"
                  onChange={(e) => setFilters({...filters, service: e.target.value})}
                >
                  <MenuItem value="">Tous</MenuItem>
                  {SERVICES.map(service => (
                    <MenuItem key={service} value={service}>{service}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2.4}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={clearFilters}
                  size="small"
                  color="error"
                  fullWidth
                >
                  Effacer filtres
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Collapse>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {filteredRequests.length} demande(s) trouvée(s) sur {requests.length} au total
          </Typography>
        </Box>
      </Paper>

      {/* Message informatif pour les agents IT */}
      {profile?.role === 'it' && (
        <Alert 
          severity="info" 
          sx={{ 
            mb: 3, 
            borderRadius: 2,
            backgroundColor: 'primary.50',
            border: '1px solid',
            borderColor: 'primary.200'
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            <strong>Vue Agent IT :</strong> Vous voyez vos demandes personnelles + les demandes qui vous ont été assignées par l'admin.
            Les demandes assignées sont surlignées en bleu avec le badge "ASSIGNÉE".
          </Typography>
        </Alert>
      )}

      {/* Message informatif pour les admins */}
      {profile?.role === 'admin' && (
        <Alert 
          severity="success" 
          sx={{ 
            mb: 3, 
            borderRadius: 2,
            backgroundColor: 'success.50',
            border: '1px solid',
            borderColor: 'success.200'
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            <strong>Vue Administrateur :</strong> Vous voyez toutes les demandes du système. 
            Vous pouvez assigner les demandes aux agents IT dans la vue détaillée.
          </Typography>
        </Alert>
      )}

      {/* Indicateur de pagination en haut */}
      {filteredRequests.length > 0 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2,
          p: 2,
          backgroundColor: 'grey.100',
          borderRadius: 2
        }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Affichage {indexOfFirstRequest + 1} - {Math.min(indexOfLastRequest, filteredRequests.length)} sur {filteredRequests.length} demandes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Page {currentPage} sur {totalPages}
          </Typography>
        </Box>
      )}

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>N° Ticket</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Catégorie</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Localisation</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Priorité</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Statut</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Service</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    {searchTerm || Object.values(filters).some(f => f) ? 
                      'Aucune demande ne correspond à votre recherche' : 
                      'Aucune demande trouvée'
                    }
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              currentRequests.map((request, index) => (
                <TableRow 
                  key={request.id}
                  sx={{ 
                    '&:nth-of-type(odd)': { backgroundColor: 'action.hover' },
                    '&:hover': { backgroundColor: 'primary.50' },
                    ...(profile?.role === 'it' && request.assigned_to === user.id && request.user_id !== user.id && {
                      border: '2px solid',
                      borderColor: 'primary.main',
                      backgroundColor: 'primary.50'
                    })
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {request.ticket_number}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        icon={request.type === 'incident' ? <AssignmentIcon /> : <ShoppingCartIcon />}
                        label={request.type === 'incident' ? 'Incident' : 'Commande'}
                        color={request.type === 'incident' ? 'error' : 'success'}
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                      {profile?.role === 'it' && request.assigned_to === user.id && request.user_id !== user.id && (
                        <Chip
                          label="ASSIGNÉE"
                          size="small"
                          color="primary"
                          sx={{ 
                            fontSize: '0.7rem', 
                            height: '20px',
                            fontWeight: 600
                          }}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>
                    <Typography variant="body2" noWrap>
                      {request.category}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 250 }}>
                    <Typography variant="body2" noWrap>
                      {request.location}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={request.priority}
                      color={getPriorityColor(request.priority)}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={request.status.replace('_', ' ')}
                      color={getStatusColor(request.status)}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>{request.service_demandeur}</TableCell>
                  <TableCell>
                    {new Date(request.created_at).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedRequest(request);
                          setDialogOpen(true);
                        }}
                        sx={{ 
                          backgroundColor: 'primary.50',
                          '&:hover': { backgroundColor: 'primary.100' }
                        }}
                      >
                        <ViewIcon fontSize="small" />
                      </IconButton>
                      
                      {profile && profile.role === 'it' && request.status === 'nouveau' && !request.assigned_to && (
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleTakeRequest(request.id)}
                          sx={{ 
                            backgroundColor: 'primary.50',
                            '&:hover': { backgroundColor: 'primary.100' }
                          }}
                          title="Prendre en charge cette demande"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      )}
                      
                      {profile && profile.role === 'it' && request.assigned_to === user.id && request.status === 'en_cours' && (
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => handleCompleteRequest(request.id)}
                          sx={{ 
                            backgroundColor: 'success.50',
                            '&:hover': { backgroundColor: 'success.100' }
                          }}
                          title="Marquer comme terminé"
                        >
                          <CheckIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Contrôles de pagination */}
      {totalPages > 1 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 2, 
          mt: 3,
          p: 2,
          backgroundColor: 'grey.50',
          borderRadius: 2
        }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            sx={{ minWidth: 40 }}
          >
            {'<<'}
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            startIcon={<NavigateBeforeIcon />}
          >
            Précédent
          </Button>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <Button
                  key={i}
                  variant={pageNumber === currentPage ? "contained" : "outlined"}
                  size="small"
                  onClick={() => setCurrentPage(pageNumber)}
                  sx={{ 
                    minWidth: 40,
                    fontWeight: pageNumber === currentPage ? 600 : 400
                  }}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </Box>

          <Button
            variant="outlined"
            size="small"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            endIcon={<NavigateNextIcon />}
          >
            Suivant
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            sx={{ minWidth: 40 }}
          >
            {'>>'}
          </Button>
        </Box>
      )}
    </Box>
  );
});

// Composant de reporting avec métriques temporelles
const ReportingTab = React.memo(({ 
  reportData, 
  profile, 
  getStatusColor, 
  getPriorityColor,
  requests,
  calculateReportData,
  showSnackbar,
  user
}) => {
  const [dateFilter, setDateFilter] = useState({
    startDate: '',
    endDate: ''
  });
  const [filteredData, setFilteredData] = useState(reportData);
  const [timeMetrics, setTimeMetrics] = useState({});
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Fonction pour filtrer les données selon le rôle et les dates
  const handleFilterByDate = useCallback(() => {
    let baseData = requests;
    
    if (profile && profile.role === 'it') {
      baseData = requests.filter(req => req.assigned_to === user.id);
    }

    let filtered = baseData;
    if (dateFilter.startDate || dateFilter.endDate) {
      filtered = baseData.filter(request => {
        const requestDate = new Date(request.created_at);
        const start = dateFilter.startDate ? new Date(dateFilter.startDate) : new Date('1900-01-01');
        const end = dateFilter.endDate ? new Date(dateFilter.endDate + 'T23:59:59') : new Date('2100-12-31');
        
        return requestDate >= start && requestDate <= end;
      });
    }

    const total = filtered.length;
    const byStatus = filtered.reduce((acc, req) => {
      acc[req.status] = (acc[req.status] || 0) + 1;
      return acc;
    }, {});
    const byPriority = filtered.reduce((acc, req) => {
      acc[req.priority] = (acc[req.priority] || 0) + 1;
      return acc;
    }, {});
    const byType = filtered.reduce((acc, req) => {
      acc[req.type] = (acc[req.type] || 0) + 1;
      return acc;
    }, {});
    
    let myStats = {};
    if (profile && profile.role === 'it') {
      myStats = {
        total: total,
        completed: filtered.filter(req => req.status === 'termine').length,
        inProgress: filtered.filter(req => req.status === 'en_cours').length,
        new: filtered.filter(req => req.status === 'nouveau').length
      };
    } else if (profile && profile.role === 'admin') {
      myStats = {
        total: total,
        completed: filtered.filter(req => req.status === 'termine').length,
        inProgress: filtered.filter(req => req.status === 'en_cours').length,
        new: filtered.filter(req => req.status === 'nouveau').length
      };
    }

    const calculatedTimeMetrics = calculateTimeMetrics(filtered);

    setFilteredData({ total, byStatus, byPriority, byType, myStats });
    setTimeMetrics(calculatedTimeMetrics);
  }, [dateFilter, requests, profile, user]);

  // Fonction pour générer le PDF avec les métriques temporelles
  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      if (!window.html2pdf) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        document.head.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      const reportTitle = profile?.role === 'it' 
        ? 'Rapport de Mes Interventions IT' 
        : 'Rapport Global de Gestion d\'Incidents IT';

      const reportSubtitle = profile?.role === 'it'
        ? `Agent IT: ${profile.email}`
        : 'Vue Administrateur - Toutes les demandes';

      const pdfContent = document.createElement('div');
      pdfContent.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #1976d2; padding-bottom: 20px;">
            <img src="/logo-centre-diagnostic.png" alt="Centre Diagnostic" style="height: 60px; margin-bottom: 10px;">
            <h1 style="color: #1976d2; margin: 10px 0;">${reportTitle}</h1>
            <p style="color: #333; font-size: 16px; font-weight: bold; margin: 5px 0;">${reportSubtitle}</p>
            <p style="color: #666; font-size: 14px;">
              ${dateFilter.startDate || dateFilter.endDate ? 
                `Période: ${dateFilter.startDate ? new Date(dateFilter.startDate).toLocaleDateString('fr-FR') : 'Début'} - 
                ${dateFilter.endDate ? new Date(dateFilter.endDate).toLocaleDateString('fr-FR') : 'Aujourd\'hui'}` :
                'Toutes les demandes'}
            </p>
            <p style="color: #666; font-size: 12px;">Généré le: ${new Date().toLocaleString('fr-FR')}</p>
          </div>

          <div style="margin-bottom: 30px;">
            <h2 style="color: #1976d2; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">Statistiques Générales</h2>
            <table style="width: 100%; margin-top: 15px;">
              <tr>
                <td style="padding: 10px; background-color: #f5f5f5; border-radius: 5px; text-align: center;">
                  <div style="color: #666; font-size: 14px;">
                    ${profile?.role === 'it' ? 'Demandes Assignées' : 'Total Demandes'}
                  </div>
                  <div style="color: #1976d2; font-size: 32px; font-weight: bold;">${filteredData.total}</div>
                </td>
                ${profile && ['it', 'admin'].includes(profile.role) ? `
                  <td style="padding: 10px; background-color: #e8f5e9; border-radius: 5px; text-align: center;">
                    <div style="color: #666; font-size: 14px;">En Cours</div>
                    <div style="color: #4caf50; font-size: 32px; font-weight: bold;">${filteredData.myStats.inProgress || 0}</div>
                  </td>
                  <td style="padding: 10px; background-color: #fff3e0; border-radius: 5px; text-align: center;">
                    <div style="color: #666; font-size: 14px;">Terminées</div>
                    <div style="color: #ff9800; font-size: 32px; font-weight: bold;">${filteredData.myStats.completed || 0}</div>
                  </td>
                  <td style="padding: 10px; background-color: #fce4ec; border-radius: 5px; text-align: center;">
                    <div style="color: #666; font-size: 14px;">Nouvelles</div>
                    <div style="color: #e91e63; font-size: 32px; font-weight: bold;">${filteredData.myStats.new || 0}</div>
                  </td>
                ` : ''}
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 30px;">
            <h2 style="color: #1976d2; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">Métriques de Performance</h2>
            <table style="width: 100%; margin-top: 15px;">
              <tr>
                <td style="padding: 10px; background-color: #e3f2fd; border-radius: 5px; text-align: center;">
                  <div style="color: #666; font-size: 14px;">Demandes Traitées</div>
                  <div style="color: #1976d2; font-size: 28px; font-weight: bold;">${timeMetrics.totalProcessed || 0}</div>
                </td>
                <td style="padding: 10px; background-color: #f3e5f5; border-radius: 5px; text-align: center;">
                  <div style="color: #666; font-size: 14px;">Temps Moyen</div>
                  <div style="color: #9c27b0; font-size: 28px; font-weight: bold;">${timeMetrics.averageProcessingTime ? formatDuration(timeMetrics.averageProcessingTime) : 'N/A'}</div>
                </td>
                <td style="padding: 10px; background-color: #e8f5e8; border-radius: 5px; text-align: center;">
                  <div style="color: #666; font-size: 14px;">Plus Rapide</div>
                  <div style="color: #4caf50; font-size: 28px; font-weight: bold;">${timeMetrics.fastestResolution ? formatDuration(timeMetrics.fastestResolution) : 'N/A'}</div>
                </td>
                <td style="padding: 10px; background-color: #fff3e0; border-radius: 5px; text-align: center;">
                  <div style="color: #666; font-size: 14px;">Plus Lent</div>
                  <div style="color: #ff9800; font-size: 28px; font-weight: bold;">${timeMetrics.slowestResolution ? formatDuration(timeMetrics.slowestResolution) : 'N/A'}</div>
                </td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="color: #333; border-bottom: 1px solid #e0e0e0; padding-bottom: 5px;">Répartition par Statut</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <thead>
                <tr style="background-color: #1976d2; color: white;">
                  <th style="padding: 10px; text-align: left; border: 1px solid #1976d2;">Statut</th>
                  <th style="padding: 10px; text-align: center; border: 1px solid #1976d2;">Nombre</th>
                  <th style="padding: 10px; text-align: center; border: 1px solid #1976d2;">Pourcentage</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(filteredData.byStatus).map(([status, count]) => `
                  <tr>
                    <td style="padding: 8px; border: 1px solid #e0e0e0;">${status.replace('_', ' ').toUpperCase()}</td>
                    <td style="padding: 8px; text-align: center; border: 1px solid #e0e0e0; font-weight: bold;">${count}</td>
                    <td style="padding: 8px; text-align: center; border: 1px solid #e0e0e0;">${filteredData.total > 0 ? ((count/filteredData.total)*100).toFixed(1) : 0}%</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="color: #333; border-bottom: 1px solid #e0e0e0; padding-bottom: 5px;">Répartition par Priorité</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <thead>
                <tr style="background-color: #1976d2; color: white;">
                  <th style="padding: 10px; text-align: left; border: 1px solid #1976d2;">Priorité</th>
                  <th style="padding: 10px; text-align: center; border: 1px solid #1976d2;">Nombre</th>
                  <th style="padding: 10px; text-align: center; border: 1px solid #1976d2;">Pourcentage</th>
                  <th style="padding: 10px; text-align: center; border: 1px solid #1976d2;">Temps Moyen</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(filteredData.byPriority).map(([priority, count]) => {
                  const priorityRequests = requests.filter(req => req.priority === priority && req.status === 'termine' && req.completed_at);
                  const avgTime = priorityRequests.length > 0 ? 
                    priorityRequests.reduce((sum, req) => sum + Math.round((new Date(req.completed_at) - new Date(req.created_at)) / (1000 * 60 * 60)), 0) / priorityRequests.length : 0;
                  
                  return `
                    <tr>
                      <td style="padding: 8px; border: 1px solid #e0e0e0;">${priority.toUpperCase()}</td>
                      <td style="padding: 8px; text-align: center; border: 1px solid #e0e0e0; font-weight: bold;">${count}</td>
                      <td style="padding: 8px; text-align: center; border: 1px solid #e0e0e0;">${filteredData.total > 0 ? ((count/filteredData.total)*100).toFixed(1) : 0}%</td>
                      <td style="padding: 8px; text-align: center; border: 1px solid #e0e0e0;">${avgTime > 0 ? formatDuration(Math.round(avgTime)) : 'N/A'}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="color: #333; border-bottom: 1px solid #e0e0e0; padding-bottom: 5px;">Répartition par Type</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <thead>
                <tr style="background-color: #1976d2; color: white;">
                  <th style="padding: 10px; text-align: left; border: 1px solid #1976d2;">Type</th>
                  <th style="padding: 10px; text-align: center; border: 1px solid #1976d2;">Nombre</th>
                  <th style="padding: 10px; text-align: center; border: 1px solid #1976d2;">Pourcentage</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(filteredData.byType).map(([type, count]) => `
                  <tr>
                    <td style="padding: 8px; border: 1px solid #e0e0e0;">${type === 'incident' ? 'Incidents' : 'Commandes'}</td>
                    <td style="padding: 8px; text-align: center; border: 1px solid #e0e0e0; font-weight: bold;">${count}</td>
                    <td style="padding: 8px; text-align: center; border: 1px solid #e0e0e0;">${filteredData.total > 0 ? ((count/filteredData.total)*100).toFixed(1) : 0}%</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e0e0e0; text-align: center; color: #666; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Centre Diagnostic - Gestion d'Incidents IT</p>
            <p>Ce rapport est confidentiel et destiné à usage interne uniquement</p>
          </div>
        </div>
      `;

      const options = {
        margin: 10,
        filename: `rapport_incidents_${profile?.role}_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await window.html2pdf().from(pdfContent).set(options).save();
      showSnackbar('PDF généré avec succès !', 'success');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      showSnackbar('Erreur lors de la génération du PDF', 'error');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  useEffect(() => {
    handleFilterByDate();
  }, [dateFilter, requests, profile, user, handleFilterByDate]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        {profile?.role === 'it' ? 'Mes Statistiques d\'Interventions IT' : 'Tableau de Bord & Statistiques Globales'}
      </Typography>

      {profile?.role === 'it' && (
        <Alert 
          severity="info" 
          sx={{ 
            mb: 3, 
            borderRadius: 2,
            backgroundColor: 'info.50',
            border: '1px solid',
            borderColor: 'info.200'
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            <strong>Vue Agent IT :</strong> Ces statistiques concernent uniquement les demandes qui vous ont été assignées.
            Vous pouvez filtrer par période et générer un rapport PDF de vos interventions.
          </Typography>
        </Alert>
      )}

      {profile?.role === 'admin' && (
        <Alert 
          severity="success" 
          sx={{ 
            mb: 3, 
            borderRadius: 2,
            backgroundColor: 'success.50',
            border: '1px solid',
            borderColor: 'success.200'
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            <strong>Vue Administrateur :</strong> Ces statistiques concernent toutes les demandes du système.
            Vous avez une vue d'ensemble complète sur l'activité du service IT.
          </Typography>
        </Alert>
      )}

      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 4, 
          background: 'linear-gradient(145deg, #e3f2fd 0%, #bbdefb 100%)',
          borderRadius: 3
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
          Filtrer par Date
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Date de début"
              type="date"
              value={dateFilter.startDate}
              onChange={(e) => setDateFilter({...dateFilter, startDate: e.target.value})}
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Date de fin"
              type="date"
              value={dateFilter.endDate}
              onChange={(e) => setDateFilter({...dateFilter, endDate: e.target.value})}
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="contained" 
                onClick={handleFilterByDate}
                sx={{ flex: 1 }}
              >
                Filtrer
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => {
                  setDateFilter({ startDate: '', endDate: '' });
                  calculateReportData(requests);
                }}
              >
                Réinitialiser
              </Button>
              <Button 
                variant="contained" 
                color="success"
                onClick={generatePDF}
                disabled={isGeneratingPDF}
                startIcon={isGeneratingPDF ? <CircularProgress size={20} /> : <DownloadIcon />}
              >
                {isGeneratingPDF ? 'Génération...' : 'PDF'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Cartes de statistiques */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card elevation={3} sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Typography color="inherit" variant="h6" gutterBottom>
                {profile?.role === 'it' ? 'Mes Interventions' : 'Total Demandes'}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {filteredData.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {profile && ['it', 'admin'].includes(profile.role) && (
          <>
            <Grid item xs={12} md={3}>
              <Card elevation={3} sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                <CardContent sx={{ color: 'white', textAlign: 'center' }}>
                  <Typography color="inherit" variant="h6" gutterBottom>
                    Nouvelles
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {filteredData.myStats.new || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card elevation={3} sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                <CardContent sx={{ color: 'white', textAlign: 'center' }}>
                  <Typography color="inherit" variant="h6" gutterBottom>
                    En Cours
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {filteredData.myStats.inProgress || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card elevation={3} sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                <CardContent sx={{ color: 'white', textAlign: 'center' }}>
                  <Typography color="inherit" variant="h6" gutterBottom>
                    Terminées
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {filteredData.myStats.completed || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>

      {/* Métriques temporelles */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card elevation={3} sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <TimerIcon sx={{ fontSize: 28, mr: 1 }} />
                <Typography color="inherit" variant="h6">
                  Temps Moyen
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {timeMetrics.averageProcessingTime ? formatDuration(timeMetrics.averageProcessingTime) : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card elevation={3} sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <TrendingUpIcon sx={{ fontSize: 28, mr: 1 }} />
                <Typography color="inherit" variant="h6">
                  Plus Rapide
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {timeMetrics.fastestResolution ? formatDuration(timeMetrics.fastestResolution) : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card elevation={3} sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <ScheduleIcon sx={{ fontSize: 28, mr: 1 }} />
                <Typography color="inherit" variant="h6">
                  Plus Lent
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {timeMetrics.slowestResolution ? formatDuration(timeMetrics.slowestResolution) : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card elevation={3} sx={{ borderRadius: 3, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Typography color="inherit" variant="h6" gutterBottom>
                Total Traité
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {timeMetrics.totalProcessed || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Graphiques de répartition */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
              Par Statut
            </Typography>
            {Object.entries(filteredData.byStatus).map(([status, count]) => (
              <Box key={status} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 1, borderRadius: 1, backgroundColor: 'grey.50' }}>
                <Chip label={status.replace('_', ' ')} color={getStatusColor(status)} size="medium" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{count}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
              Par Priorité
            </Typography>
            {Object.entries(filteredData.byPriority).map(([priority, count]) => (
              <Box key={priority} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 1, borderRadius: 1, backgroundColor: 'grey.50' }}>
                <Chip label={priority.toUpperCase()} color={getPriorityColor(priority)} size="medium" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{count}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
              Par Type
            </Typography>
            {Object.entries(filteredData.byType).map(([type, count]) => (
              <Box key={type} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 1, borderRadius: 1, backgroundColor: 'grey.50' }}>
                <Chip
                  label={type === 'incident' ? 'Incidents' : 'Commandes'}
                  icon={type === 'incident' ? <AssignmentIcon /> : <ShoppingCartIcon />}
                  color={type === 'incident' ? 'error' : 'success'}
                  size="medium"
                />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{count}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
});

// ========================================
// COMPOSANT PRINCIPAL APP
// ========================================

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // États principaux
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [requests, setRequests] = useState([]);
  const [profiles, setProfiles] = useState([]);
  
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  
  const [authMode, setAuthMode] = useState('login');
  const [authData, setAuthData] = useState({
    email: '',
    phone: '',
    password: '',
    service: ''
  });
  
  const [requestData, setRequestData] = useState({
    type: '',
    category: '',
    title: '',
    description: '',
    location: '',
    priority: '',
    service_demandeur: ''
  });
  
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [requestDialog, setRequestDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  
  const [reportData, setReportData] = useState({
    total: 0,
    byStatus: {},
    byPriority: {},
    byType: {},
    myStats: {}
  });

  const debugSupabaseError = (error, operation) => {
    console.error(`Erreur Supabase - ${operation}:`, {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    
    if (error.message.includes('JWT')) {
      console.error('Problème d\'authentification JWT détecté');
    }
    
    if (error.message.includes('RLS')) {
      console.error('Problème de Row Level Security détecté');
    }
    
    if (error.code === '401') {
      console.error('Accès non autorisé - Vérifiez les permissions');
    }
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const calculateReportData = useCallback((data) => {
    const total = data.length;
    const byStatus = data.reduce((acc, req) => {
      acc[req.status] = (acc[req.status] || 0) + 1;
      return acc;
    }, {});
    const byPriority = data.reduce((acc, req) => {
      acc[req.priority] = (acc[req.priority] || 0) + 1;
      return acc;
    }, {});
    const byType = data.reduce((acc, req) => {
      acc[req.type] = (acc[req.type] || 0) + 1;
      return acc;
    }, {});
    
    let myStats = {};
    if (profile && profile.role === 'it') {
      const myAssignedRequests = data.filter(req => req.assigned_to === user?.id);
      myStats = {
        total: myAssignedRequests.length,
        completed: myAssignedRequests.filter(req => req.status === 'termine').length,
        inProgress: myAssignedRequests.filter(req => req.status === 'en_cours').length,
        new: myAssignedRequests.filter(req => req.status === 'nouveau').length
      };
    } else if (profile && profile.role === 'admin') {
      myStats = {
        total: total,
        completed: data.filter(req => req.status === 'termine').length,
        inProgress: data.filter(req => req.status === 'en_cours').length,
        new: data.filter(req => req.status === 'nouveau').length
      };
    }
    
    setReportData({ total, byStatus, byPriority, byType, myStats });
  }, [profile, user]);

  const checkUser = useCallback(async () => {
    try {
      console.log('Vérification de l\'utilisateur...');
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        debugSupabaseError(error, 'checkUser');
        throw error;
      }
      
      if (user) {
        console.log('Utilisateur trouvé:', user.email);
        setUser(user);
        await fetchProfile(user.id);
      } else {
        console.log('Aucun utilisateur connecté');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'utilisateur:', error);
      showSnackbar('Erreur de connexion', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProfile = useCallback(async (userId) => {
    try {
      console.log('Récupération du profil pour:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        debugSupabaseError(error, 'fetchProfile');
        
        if (error.code === 'PGRST116') {
          console.log('Profil non trouvé, création d\'un profil par défaut...');
          const { data: userData } = await supabase.auth.getUser();
          if (userData.user) {
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert([
                {
                  id: userData.user.id,
                  email: userData.user.email,
                  service: 'IT',
                  role: 'user'
                }
              ])
              .select()
              .single();
            
            if (createError) {
              debugSupabaseError(createError, 'createProfile');
              throw createError;
            }
            
            console.log('Profil créé:', newProfile);
            setProfile(newProfile);
            return;
          }
        }
        throw error;
      }
      
      console.log('Profil récupéré:', data);
      setProfile(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      showSnackbar('Erreur lors de la récupération du profil', 'error');
    }
  }, []);

  const fetchRequests = useCallback(async () => {
    try {
      console.log('Récupération des demandes...');
      let query = supabase
        .from('requests')
        .select(`
          *,
          assigned_profile:assigned_to(email, service),
          user_profile:user_id(email, service)
        `)
        .order('created_at', { ascending: false });

      if (profile && profile.role === 'user') {
        query = query.eq('user_id', user.id);
        console.log('Filtrage pour utilisateur standard');
      } else if (profile && profile.role === 'it') {
        query = query.or(`user_id.eq.${user.id},assigned_to.eq.${user.id}`);
        console.log('Filtrage pour agent IT');
      } else if (profile && profile.role === 'admin') {
        console.log('Récupération de toutes les demandes (Admin)');
      }

      const { data, error } = await query;
      
      if (error) {
        debugSupabaseError(error, 'fetchRequests');
        throw error;
      }
      
      console.log('Demandes récupérées:', data?.length || 0);
      setRequests(data || []);
      calculateReportData(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des demandes:', error);
      showSnackbar('Erreur lors de la récupération des demandes', 'error');
    }
  }, [profile, user, calculateReportData]);

  const fetchProfiles = useCallback(async () => {
    try {
      console.log('Récupération des profils IT...');
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('service', 'IT');
      
      if (error) {
        debugSupabaseError(error, 'fetchProfiles');
        console.warn('Impossible de récupérer les profils IT');
        return;
      }
      
      console.log('Profils IT récupérés:', data?.length || 0);
      setProfiles(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des profils:', error);
    }
  }, []);

  // Initialisation
  useEffect(() => {
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email || 'No user');
      if (event === 'SIGNED_IN') {
        setUser(session?.user || null);
        if (session?.user) {
          fetchProfile(session.user.id);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkUser, fetchProfile]);

  useEffect(() => {
    if (user && profile) {
      console.log('Utilisateur connecté:', {
        email: user.email,
        role: profile.role,
        service: profile.service
      });
      fetchRequests();
      if (['it', 'admin'].includes(profile.role)) {
        fetchProfiles();
      }
    }
  }, [user, profile, fetchRequests, fetchProfiles]);

  useEffect(() => {
    if (profile && profile.service) {
      setRequestData((prev) => ({
        ...prev,
        service_demandeur: profile.service
      }));
    }
  }, [profile]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (authMode === 'login') {
        console.log('Tentative de connexion pour:', authData.email);
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authData.email,
          password: authData.password
        });
        
        if (error) {
          debugSupabaseError(error, 'login');
          throw error;
        }
        
        console.log('Connexion réussie');
        setUser(data.user);
        await fetchProfile(data.user.id);
        showSnackbar('Connexion réussie !', 'success');
      } else {
        console.log('Tentative d\'inscription pour:', authData.email);
        const { data, error } = await supabase.auth.signUp({
          email: authData.email,
          password: authData.password
        });
        
        if (error) {
          debugSupabaseError(error, 'signup');
          throw error;
        }
        
        if (data.user) {
          console.log('Création du profil utilisateur...');
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: data.user.id,
                email: authData.email,
                phone: authData.phone,
                service: authData.service,
                role: authData.service === 'IT' ? 'it' : 'user'
              }
            ]);
          
          if (profileError) {
            debugSupabaseError(profileError, 'createProfile');
            throw profileError;
          }
          
          console.log('Inscription et profil créés avec succès');
          setUser(data.user);
          await fetchProfile(data.user.id);
          showSnackbar('Compte créé avec succès !', 'success');
        }
      }
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      let errorMessage = error.message;
      
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Email ou mot de passe incorrect';
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Veuillez confirmer votre email avant de vous connecter';
      }
      
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    console.log('Déconnexion...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } else {
      console.log('Déconnexion réussie');
    }
    setUser(null);
    setProfile(null);
    setMenuAnchor(null);
    setActiveTab(0);
    showSnackbar('À bientôt !', 'info');
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Création d\'une nouvelle demande...');
      const { error } = await supabase
        .from('requests')
        .insert([
          {
            ...requestData,
            user_id: user.id,
            title: `${requestData.category} - ${requestData.location}`
          }
        ]);
      
      if (error) {
        debugSupabaseError(error, 'createRequest');
        throw error;
      }
      
      console.log('Demande créée avec succès');
      setRequestDialog(false);
      setRequestData({
        type: '',
        category: '',
        title: '',
        description: '',
        location: '',
        priority: '',
        service_demandeur: ''
      });
      
      await fetchRequests();
      showSnackbar('Demande créée avec succès !', 'success');
    } catch (error) {
      console.error('Erreur lors de la création de la demande:', error);
      showSnackbar('Erreur lors de la création de la demande', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleTakeRequest = async (requestId) => {
    try {
      console.log('Prise en charge de la demande:', requestId);
      const { error } = await supabase
        .from('requests')
        .update({
          assigned_to: user.id,
          status: 'en_cours',
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);
      
      if (error) {
        debugSupabaseError(error, 'takeRequest');
        throw error;
      }
      
      console.log('Demande prise en charge');
      await fetchRequests();
      showSnackbar('Demande prise en charge !', 'success');
    } catch (error) {
      console.error('Erreur lors de la prise en charge:', error);
      showSnackbar('Erreur lors de la prise en charge', 'error');
    }
  };

  const handleCompleteRequest = async (requestId) => {
    try {
      console.log('Clôture de la demande:', requestId);
      const { error } = await supabase
        .from('requests')
        .update({
          status: 'termine',
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);
      
      if (error) {
        debugSupabaseError(error, 'completeRequest');
        throw error;
      }
      
      console.log('Demande terminée');
      await fetchRequests();
      showSnackbar('Demande terminée !', 'success');
    } catch (error) {
      console.error('Erreur lors de la clôture:', error);
      showSnackbar('Erreur lors de la clôture', 'error');
    }
  };

  const handleAssignRequest = async (requestId, assignedTo) => {
    try {
      console.log('Assignation de la demande:', requestId, 'à ', assignedTo);
      const { error } = await supabase
        .from('requests')
        .update({
          assigned_to: assignedTo,
          status: assignedTo ? 'en_cours' : 'nouveau',
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);
      
      if (error) {
        debugSupabaseError(error, 'assignRequest');
        throw error;
      }
      
      console.log('Demande assignée');
      await fetchRequests();
      showSnackbar('Demande assignée !', 'success');
    } catch (error) {
      console.error('Erreur lors de l\'assignation:', error);
      showSnackbar('Erreur lors de l\'assignation', 'error');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'nouveau': return 'default';
      case 'en_cours': return 'warning';
      case 'termine': return 'success';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'basse': return 'success';
      case 'moyenne': return 'warning';
      case 'urgente': return 'error';
      default: return 'default';
    }
  };

  // Affichage d'erreur si la configuration Supabase est manquante
  if (!supabaseUrl || !supabaseAnonKey) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>Configuration Supabase manquante</Typography>
            <Typography gutterBottom>
              Les variables d'environnement Supabase ne sont pas définies.
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Créez un fichier <code>.env.local</code> avec :
              <br />
              <code>REACT_APP_SUPABASE_URL=votre-url-supabase</code>
              <br />
              <code>REACT_APP_SUPABASE_ANON_KEY=votre-clé-anonyme</code>
            </Typography>
          </Alert>
        </Container>
      </ThemeProvider>
    );
  }

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress sx={{ height: 6, borderRadius: 3 }} />
          <Typography align="center" sx={{ mt: 4, fontSize: '1.2rem' }}>
            Chargement de l'application...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  if (!user || !profile) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthForm 
          authMode={authMode}
          setAuthMode={setAuthMode}
          authData={authData}
          setAuthData={setAuthData}
          handleAuth={handleAuth}
          loading={loading}
          supabaseUrl={supabaseUrl}
          supabaseAnonKey={supabaseAnonKey}
        />
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({...snackbar, open: false})}
        >
          <Alert severity={snackbar.severity} sx={{ borderRadius: 2 }}>{snackbar.message}</Alert>
        </Snackbar>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Version mobile - Barre d'app simplifiée */}
      {isMobile ? (
        <AppBar position="fixed" elevation={4} sx={{ top: 0, bottom: 'auto' }}>
          <Toolbar sx={{ minHeight: 56 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Gestion IT
            </Typography>
            <Avatar sx={{ 
              bgcolor: 'primary.dark', 
              width: 32, 
              height: 32,
              fontSize: '0.9rem'
            }}>
              {profile.email?.[0]?.toUpperCase()}
            </Avatar>
          </Toolbar>
        </AppBar>
      ) : (
        /* Version desktop - Barre d'app standard */
        <AppBar position="static" elevation={4}>
          <Toolbar sx={{ minHeight: 70 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <img 
                src="/logo-centre-diagnostic.png" 
                alt="Centre Diagnostic" 
                style={{ 
                  height: '50px',
                  maxWidth: '150px',
                  objectFit: 'contain',
                  marginRight: '16px'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Box>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Gestion d'Incidents IT
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ textAlign: 'right', mr: 2 }}>
                <Typography sx={{ fontWeight: 500 }}>
                  {profile.email}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Service {profile.service} - Rôle: {profile.role.toUpperCase()}
                </Typography>
              </Box>
              <IconButton
                color="inherit"
                onClick={(e) => setMenuAnchor(e.currentTarget)}
                sx={{ ml: 1 }}
              >
                <AccountCircleIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* Drawer mobile pour le menu */}
      {isMobile && (
        <SwipeableDrawer
          anchor="left"
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          onOpen={() => setMobileDrawerOpen(true)}
          PaperProps={{
            sx: { width: '80%', maxWidth: 300 }
          }}
        >
          <Box sx={{ 
            p: 2, 
            backgroundColor: 'primary.main', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Mon Profil
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {profile.email}
              </Typography>
            </Box>
            <IconButton 
              color="inherit" 
              onClick={() => setMobileDrawerOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Divider />
          
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Service: {profile.service}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Rôle: {profile.role.toUpperCase()}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ mt: 2 }}
            >
              Se déconnecter
            </Button>
          </Box>
        </SwipeableDrawer>
      )}

      {/* Menu desktop */}
      {!isMobile && (
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
          PaperProps={{ sx: { borderRadius: 2, mt: 1 } }}
        >
          <MenuItem onClick={handleLogout} sx={{ py: 1.5, px: 3 }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Se déconnecter</ListItemText>
          </MenuItem>
        </Menu>
      )}

      {/* Contenu principal avec adaptation mobile */}
      <Container 
        maxWidth={isMobile ? false : "xl"} 
        sx={{ 
          mt: isMobile ? 8 : 3, 
          mb: isMobile ? 10 : 3,
          px: isMobile ? 1 : 3
        }}
      >
        {/* Tabs desktop */}
        {!isMobile && (
          <Paper elevation={6} sx={{ borderRadius: 3 }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              centered
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                '& .MuiTab-root': { 
                  fontSize: '1.1rem', 
                  fontWeight: 500,
                  py: 2
                }
              }}
            >
              <Tab icon={<DashboardIcon />} label="Mes Demandes" />
              <Tab icon={<ReportIcon />} label="Reporting" />
              {/* Onglet Gestion des utilisateurs - visible uniquement pour les admins */}
              {profile?.role === 'admin' && (
                <Tab icon={<PeopleIcon />} label="Gestion Utilisateurs" />
              )}
              {/* Nouvel onglet Inventaire - visible uniquement pour les admins */}
              {profile?.role === 'admin' && (
                <Tab icon={<InventoryIcon />} label="Inventaire IT" />
              )}
            </Tabs>
            
            <Box sx={{ p: 4 }}>
              {activeTab === 0 && (
                <RequestsTab 
                  profile={profile}
                  requests={requests}
                  setRequestDialog={setRequestDialog}
                  setSelectedRequest={setSelectedRequest}
                  setDialogOpen={setDialogOpen}
                  handleTakeRequest={handleTakeRequest}
                  handleCompleteRequest={handleCompleteRequest}
                  user={user}
                  getStatusColor={getStatusColor}
                  getPriorityColor={getPriorityColor}
                />
              )}
              {activeTab === 1 && (
                <ReportingTab 
                  reportData={reportData}
                  profile={profile}
                  getStatusColor={getStatusColor}
                  getPriorityColor={getPriorityColor}
                  requests={requests}
                  calculateReportData={calculateReportData}
                  showSnackbar={showSnackbar}
                  user={user}
                />
              )}
              {activeTab === 2 && profile?.role === 'admin' && (
                <UsersManagementTab 
                  profiles={profiles}
                  fetchProfiles={fetchProfiles}
                  showSnackbar={showSnackbar}
                />
              )}
              {activeTab === 3 && profile?.role === 'admin' && (
                <InventoryManagementTab 
                  showSnackbar={showSnackbar}
                  user={user}
                />
              )}
            </Box>
          </Paper>
        )}
        
        {/* Contenu mobile sans Paper wrapper */}
        {isMobile && (
          <Box sx={{ pb: 2 }}>
            {activeTab === 0 && (
              <RequestsTab 
                profile={profile}
                requests={requests}
                setRequestDialog={setRequestDialog}
                setSelectedRequest={setSelectedRequest}
                setDialogOpen={setDialogOpen}
                handleTakeRequest={handleTakeRequest}
                handleCompleteRequest={handleCompleteRequest}
                user={user}
                getStatusColor={getStatusColor}
                getPriorityColor={getPriorityColor}
              />
            )}
            {activeTab === 1 && (
              <ReportingTab 
                reportData={reportData}
                profile={profile}
                getStatusColor={getStatusColor}
                getPriorityColor={getPriorityColor}
                requests={requests}
                calculateReportData={calculateReportData}
                showSnackbar={showSnackbar}
                user={user}
              />
            )}
            {activeTab === 2 && profile?.role === 'admin' && (
              <UsersManagementTab 
                profiles={profiles}
                fetchProfiles={fetchProfiles}
                showSnackbar={showSnackbar}
              />
            )}
            {activeTab === 3 && profile?.role === 'admin' && (
              <InventoryManagementTab 
                showSnackbar={showSnackbar}
                user={user}
              />
            )}
          </Box>
        )}
      </Container>

      {/* Navigation bottom pour mobile */}
      {isMobile && (
        <Paper 
          sx={{ 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0,
            zIndex: 1200
          }} 
          elevation={8}
        >
          <BottomNavigation
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            showLabels
          >
            <BottomNavigationAction
              label="Demandes"
              icon={<DashboardIcon />}
            />
            <BottomNavigationAction
              label="Stats"
              icon={<ReportIcon />}
            />
            {/* Onglet mobile pour la gestion des utilisateurs - admin uniquement */}
            {profile?.role === 'admin' && (
              <BottomNavigationAction
                label="Users"
                icon={<PeopleIcon />}
              />
            )}
            {/* Onglet mobile pour l'inventaire - admin uniquement */}
            {profile?.role === 'admin' && (
              <BottomNavigationAction
                label="Inventaire"
                icon={<InventoryIcon />}
              />
            )}
          </BottomNavigation>
        </Paper>
      )}

      {/* FAB pour nouvelle demande sur mobile */}
      {isMobile && activeTab === 0 && (
        <Fab
          color="primary"
          onClick={() => setRequestDialog(true)}
          sx={{
            position: 'fixed',
            bottom: profile?.role === 'admin' ? 88 : 72, // Ajuster selon le nombre d'onglets
            right: 16,
            zIndex: 1000,
            boxShadow: '0 8px 24px rgba(25, 118, 210, 0.4)'
          }}
        >
          <AddIcon />
        </Fab>
      )}

      {/* Dialog nouvelle demande - ADAPTÉ MOBILE */}
      <Dialog 
        open={requestDialog} 
        onClose={() => setRequestDialog(false)} 
        maxWidth={isMobile ? false : "md"}
        fullScreen={isMobile}
        fullWidth={!isMobile}
        TransitionComponent={isMobile ? Slide : undefined}
        TransitionProps={isMobile ? { direction: 'up' } : undefined}
        PaperProps={{
          sx: isMobile ? {} : { 
            borderRadius: 3, 
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)' 
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 1, 
          backgroundColor: 'primary.main', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          py: isMobile ? 2 : 3
        }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setRequestDialog(false)}
              sx={{ mr: 1 }}
            >
              <CloseIcon />
            </IconButton>
          )}
          <AddIcon sx={{ fontSize: isMobile ? 24 : 28 }} />
          <Typography variant={isMobile ? "h6" : "h5"} component="span" sx={{ fontWeight: 600 }}>
            {isMobile ? 'Nouvelle Demande' : 'Créer une Nouvelle Demande'}
          </Typography>
        </DialogTitle>
        
        <form onSubmit={handleCreateRequest}>
          <DialogContent sx={{ pt: isMobile ? 2 : 4, pb: 2 }}>
            
            {/* ÉTAPE 1 : TYPE ET CATÉGORIE - SIMPLIFIÉ POUR MOBILE */}
            <Box sx={{ mb: isMobile ? 3 : 4 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: isMobile ? 2 : 3,
                pb: 1,
                borderBottom: isMobile ? '2px solid' : '3px solid',
                borderColor: 'primary.main'
              }}>
                <Box sx={{ 
                  backgroundColor: 'primary.main', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: isMobile ? 28 : 32, 
                  height: isMobile ? 28 : 32, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '0.9rem' : '1rem'
                }}>
                  1
                </Box>
                <Typography variant={isMobile ? "body1" : "h6"} color="primary.main" sx={{ fontWeight: 700 }}>
                  TYPE DE DEMANDE
                </Typography>
              </Box>
              
              <Box sx={{ 
                backgroundColor: 'grey.50', 
                p: isMobile ? 2 : 3, 
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.300'
              }}>
                <Grid container spacing={isMobile ? 2 : 3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant={isMobile ? "body2" : "subtitle1"} sx={{ fontWeight: 600, mb: 1 }}>
                      Type de demande
                    </Typography>
                    <FormControl fullWidth required size={isMobile ? "small" : "medium"}>
                      <InputLabel id="type-demande-label">Sélectionnez...</InputLabel>
                      <Select
                        labelId="type-demande-label"
                        id="type-demande-select"
                        value={requestData.type}
                        label="Sélectionnez..."
                        onChange={(e) => setRequestData({...requestData, type: e.target.value, category: ''})}
                        sx={{ backgroundColor: 'white' }}
                      >
                        <MenuItem value="incident">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AssignmentIcon color="error" fontSize={isMobile ? "small" : "medium"} />
                            <Typography variant={isMobile ? "body2" : "body1"}>
                              Incident Technique
                            </Typography>
                          </Box>
                        </MenuItem>
                        <MenuItem value="order">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ShoppingCartIcon color="success" fontSize={isMobile ? "small" : "medium"} />
                            <Typography variant={isMobile ? "body2" : "body1"}>
                              Commande Matériel
                            </Typography>
                          </Box>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant={isMobile ? "body2" : "subtitle1"} sx={{ fontWeight: 600, mb: 1 }}>
                      Catégorie
                    </Typography>
                    <FormControl fullWidth required disabled={!requestData.type} size={isMobile ? "small" : "medium"}>
                      <InputLabel id="category-label">Choisissez...</InputLabel>
                      <Select
                        labelId="category-label"
                        id="category-select"
                        value={requestData.category}
                        label="Choisissez..."
                        onChange={(e) => setRequestData({...requestData, category: e.target.value})}
                        sx={{ backgroundColor: requestData.type ? 'white' : 'grey.200' }}
                        MenuProps={isMobile ? { PaperProps: { sx: { maxHeight: 300 } } } : {}}
                      >
                        {(requestData.type === 'incident' ? INCIDENT_TYPES : ORDER_TYPES).map(category => (
                          <MenuItem key={category} value={category}>
                            <Typography variant={isMobile ? "body2" : "body2"}>
                              {category}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/* ÉTAPE 2 : DESCRIPTION ET LOCALISATION - SIMPLIFIÉ POUR MOBILE */}
            <Box sx={{ mb: isMobile ? 3 : 4 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: isMobile ? 2 : 3,
                pb: 1,
                borderBottom: isMobile ? '2px solid' : '3px solid',
                borderColor: 'success.main'
              }}>
                <Box sx={{ 
                  backgroundColor: 'success.main', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: isMobile ? 28 : 32, 
                  height: isMobile ? 28 : 32, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '0.9rem' : '1rem'
                }}>
                  2
                </Box>
                <Typography variant={isMobile ? "body1" : "h6"} color="success.main" sx={{ fontWeight: 700 }}>
                  DESCRIPTION
                </Typography>
              </Box>
              
              <Box sx={{ 
                backgroundColor: 'green.50', 
                p: isMobile ? 2 : 3, 
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'success.200'
              }}>
                <Box sx={{ mb: isMobile ? 2 : 3 }}>
                  <Typography variant={isMobile ? "body2" : "subtitle1"} sx={{ fontWeight: 600, mb: 1 }}>
                    Description
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Expliquez le problème..."
                    multiline
                    rows={isMobile ? 3 : 4}
                    value={requestData.description}
                    onChange={(e) => setRequestData({...requestData, description: e.target.value})}
                    required
                    size={isMobile ? "small" : "medium"}
                    sx={{ backgroundColor: 'white' }}
                  />
                </Box>
                
                <Grid container spacing={isMobile ? 2 : 3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant={isMobile ? "body2" : "subtitle1"} sx={{ fontWeight: 600, mb: 1 }}>
                      Localisation
                    </Typography>
                    <FormControl fullWidth required size={isMobile ? "small" : "medium"}>
                      <InputLabel id="location-label">Sélectionnez...</InputLabel>
                      <Select
                        labelId="location-label"
                        id="location-select"
                        value={requestData.location}
                        onChange={(e) => setRequestData({...requestData, location: e.target.value})}
                        label="Sélectionnez..."
                        sx={{ backgroundColor: 'white' }}
                        MenuProps={isMobile ? { PaperProps: { sx: { maxHeight: 250 } } } : {}}
                      >
                        {LOCATIONS.map((loc) => (
                          <MenuItem key={loc} value={loc}>
                            <Typography variant={isMobile ? "caption" : "body2"} sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                              {loc}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant={isMobile ? "body2" : "subtitle1"} sx={{ fontWeight: 600, mb: 1 }}>
                      Service
                    </Typography>
                    <FormControl fullWidth required size={isMobile ? "small" : "medium"}>
                      <InputLabel id="service-label">Votre service...</InputLabel>
                      <Select
                        labelId="service-label"
                        id="service-select"
                        value={requestData.service_demandeur}
                        label="Votre service..."
                        onChange={(e) => setRequestData({...requestData, service_demandeur: e.target.value})}
                        sx={{ backgroundColor: 'white' }}
                      >
                        {SERVICES.map(service => (
                          <MenuItem key={service} value={service}>
                            <Typography variant={isMobile ? "body2" : "body2"}>
                              {service}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {/* ÉTAPE 3 : PRIORITÉ - SIMPLIFIÉ POUR MOBILE */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: isMobile ? 2 : 3,
                pb: 1,
                borderBottom: isMobile ? '2px solid' : '3px solid',
                borderColor: 'warning.main'
              }}>
                <Box sx={{ 
                  backgroundColor: 'warning.main', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: isMobile ? 28 : 32, 
                  height: isMobile ? 28 : 32, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '0.9rem' : '1rem'
                }}>
                  3
                </Box>
                <Typography variant={isMobile ? "body1" : "h6"} color="warning.dark" sx={{ fontWeight: 700 }}>
                  URGENCE
                </Typography>
              </Box>
              
              <Box sx={{ 
                backgroundColor: 'orange.50', 
                p: isMobile ? 2 : 3, 
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'warning.200'
              }}>
                <FormControl fullWidth required size={isMobile ? "small" : "medium"}>
                  <InputLabel id="priority-label">Niveau d'urgence...</InputLabel>
                  <Select
                    labelId="priority-label"
                    id="priority-select"
                    value={requestData.priority}
                    label="Niveau d'urgence..."
                    onChange={(e) => setRequestData({...requestData, priority: e.target.value})}
                    sx={{ backgroundColor: 'white' }}
                  >
                    <MenuItem value="basse">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'success.main' }} />
                        <Typography variant={isMobile ? "body2" : "body1"}>
                          Basse
                        </Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="moyenne">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'warning.main' }} />
                        <Typography variant={isMobile ? "body2" : "body1"}>
                          Moyenne
                        </Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="urgente">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'error.main' }} />
                        <Typography variant={isMobile ? "body2" : "body1"}>
                          Urgente
                        </Typography>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            
          </DialogContent>
          
          <DialogActions sx={{ 
            p: isMobile ? 2 : 3, 
            backgroundColor: 'grey.100', 
            borderTop: '2px solid', 
            borderColor: 'grey.300',
            gap: isMobile ? 1 : 2,
            ...(isMobile && {
              position: 'sticky',
              bottom: 0,
              zIndex: 1
            })
          }}>
            <Button 
              onClick={() => setRequestDialog(false)}
              variant="outlined"
              size={isMobile ? "medium" : "large"}
              sx={{ 
                minWidth: isMobile ? 100 : 120,
                fontWeight: 600
              }}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              size={isMobile ? "medium" : "large"}
              disabled={loading}
              sx={{ 
                minWidth: isMobile ? 120 : 160,
                fontWeight: 600
              }}
            >
              {loading ? 'Création...' : 'Créer'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Dialog détail demande */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { 
            borderRadius: 3, 
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)' 
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 2, 
          backgroundColor: 'primary.main', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          py: 3
        }}>
          <ViewIcon sx={{ fontSize: 28 }} />
          <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
            Détail de la Demande
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          {selectedRequest && (
            <>
              {/* En-tête avec statut et type */}
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  mb: 3, 
                  background: 'linear-gradient(145deg, #e3f2fd 0%, #bbdefb 100%)',
                  border: '1px solid', 
                  borderColor: 'primary.200',
                  borderRadius: 3
                }}
              >
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                      Numéro de ticket
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        color: 'primary.main',
                        fontSize: '1.2rem'
                      }}
                    >
                      {selectedRequest.ticket_number}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                      Type de demande
                    </Typography>
                    <Chip
                      icon={selectedRequest.type === 'incident' ? <AssignmentIcon /> : <ShoppingCartIcon />}
                      label={selectedRequest.type === 'incident' ? 'Incident Technique' : 'Commande Matériel'}
                      color={selectedRequest.type === 'incident' ? 'error' : 'success'}
                      size="medium"
                      sx={{ fontWeight: 600, fontSize: '0.9rem' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                      Statut actuel
                    </Typography>
                    <Chip 
                      label={selectedRequest.status.replace('_', ' ').toUpperCase()} 
                      color={getStatusColor(selectedRequest.status)} 
                      size="medium"
                      sx={{ fontWeight: 600, fontSize: '0.9rem' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                      Niveau de priorité
                    </Typography>
                    <Chip 
                      label={selectedRequest.priority.toUpperCase()} 
                      color={getPriorityColor(selectedRequest.priority)} 
                      size="medium"
                      sx={{ fontWeight: 600, fontSize: '0.9rem' }}
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Informations principales */}
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  mb: 3, 
                  backgroundColor: 'linear-gradient(145deg, #f8f9ff 0%, #f0f4f8 100%)',
                  borderRadius: 3
                }}
              >
                <Typography 
                  variant="h6" 
                  color="primary.main" 
                  gutterBottom 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5, 
                    mb: 3,
                    fontWeight: 600
                  }}
                >
                  Informations de la Demande
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                      Catégorie
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 500, 
                        p: 2.5, 
                        backgroundColor: 'white', 
                        borderRadius: 2, 
                        border: '2px solid', 
                        borderColor: 'grey.200',
                        fontSize: '1.1rem'
                      }}
                    >
                      {selectedRequest.category}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                      Description complète
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        p: 2.5, 
                        backgroundColor: 'white', 
                        borderRadius: 2, 
                        border: '2px solid', 
                        borderColor: 'grey.200', 
                        lineHeight: 1.8,
                        fontSize: '1rem'
                      }}
                    >
                      {selectedRequest.description}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {/* Informations de localisation et service */}
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  mb: 3, 
                  backgroundColor: 'linear-gradient(145deg, #fff3e0 0%, #ffe0b2 100%)',
                  borderRadius: 3
                }}
              >
                <Typography 
                  variant="h6" 
                  color="orange.800" 
                  gutterBottom 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5, 
                    mb: 3,
                    fontWeight: 600
                  }}
                >
                  Informations Organisationnelles
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                      Localisation
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 500, 
                        p: 2.5, 
                        backgroundColor: 'white', 
                        borderRadius: 2, 
                        border: '2px solid', 
                        borderColor: 'grey.200',
                        fontSize: '1rem'
                      }}
                    >
                      {selectedRequest.location}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                      Service demandeur
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 500, 
                        p: 2.5, 
                        backgroundColor: 'white', 
                        borderRadius: 2, 
                        border: '2px solid', 
                        borderColor: 'grey.200',
                        fontSize: '1rem'
                      }}
                    >
                      {selectedRequest.service_demandeur}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                      Email du demandeur
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        p: 2.5,
                        backgroundColor: 'white',
                        borderRadius: 2,
                        border: '2px solid',
                        borderColor: 'grey.200',
                        fontSize: '1rem'
                      }}
                    >
                      {selectedRequest.user_profile?.email}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {/* Informations de suivi */}
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  mb: 3, 
                  backgroundColor: 'linear-gradient(145deg, #e8f5e8 0%, #c8e6c9 100%)',
                  borderRadius: 3
                }}
              >
                <Typography 
                  variant="h6" 
                  color="green.800" 
                  gutterBottom 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5, 
                    mb: 3,
                    fontWeight: 600
                  }}
                >
                  Suivi de la Demande
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                      Date de création
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 500, 
                        p: 2.5, 
                        backgroundColor: 'white', 
                        borderRadius: 2, 
                        border: '2px solid', 
                        borderColor: 'grey.200',
                        fontSize: '1rem'
                      }}
                    >
                      {new Date(selectedRequest.created_at).toLocaleString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Typography>
                  </Grid>
                  
                  {selectedRequest.assigned_profile && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                        Assigné à
                      </Typography>
                      <Box sx={{ 
                        p: 2.5, 
                        backgroundColor: 'white', 
                        borderRadius: 2, 
                        border: '2px solid', 
                        borderColor: 'grey.200' 
                      }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                          {selectedRequest.assigned_profile.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          Service {selectedRequest.assigned_profile.service}
                        </Typography>
                      </Box>
                    </Grid>
                  )}

                  {/* Affichage du temps de traitement si la demande est terminée */}
                  {selectedRequest.status === 'termine' && selectedRequest.completed_at && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                        Temps de traitement
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: 500, 
                          p: 2.5, 
                          backgroundColor: 'white', 
                          borderRadius: 2, 
                          border: '2px solid', 
                          borderColor: 'grey.200',
                          fontSize: '1rem'
                        }}
                      >
                        {formatDuration(Math.round((new Date(selectedRequest.completed_at) - new Date(selectedRequest.created_at)) / (1000 * 60 * 60)))}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>

              {/* Section d'assignation pour les admins */}
              {profile && profile.role === 'admin' && profiles.length > 0 && (
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 3, 
                    backgroundColor: 'linear-gradient(145deg, #fff3e0 0%, #ffcc02 100%)',
                    border: '2px solid', 
                    borderColor: 'warning.300',
                    borderRadius: 3
                  }}
                >
                  <Typography 
                    variant="h6" 
                    color="warning.dark" 
                    gutterBottom 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1.5, 
                      mb: 3,
                      fontWeight: 600
                    }}
                  >
                    Actions Administrateur
                  </Typography>
                  
                  <FormControl fullWidth>
                    <InputLabel id="assign-label" sx={{ fontWeight: 600 }}>Réassigner à un agent IT</InputLabel>
                    <Select
                      labelId="assign-label"
                      id="assign-select"
                      value={selectedRequest.assigned_to || ''}
                      label="Réassigner à un agent IT"
                      onChange={(e) => handleAssignRequest(selectedRequest.id, e.target.value)}
                      sx={{ 
                        backgroundColor: 'white',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2
                        }
                      }}
                    >
                      <MenuItem value="">
                        <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
                          Non assigné
                        </Typography>
                      </MenuItem>
                      {profiles.map(prof => (
                        <MenuItem key={prof.id} value={prof.id}>
                          <Box sx={{ py: 0.5 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {prof.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Service {prof.service}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Paper>
              )}
            </>
          )}
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 3, 
          backgroundColor: 'grey.50', 
          borderTop: '1px solid', 
          borderColor: 'grey.200' 
        }}>
          <Button 
            onClick={() => setDialogOpen(false)}
            variant="contained"
            size="large"
            sx={{ 
              minWidth: 120,
              fontWeight: 600,
              boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)'
            }}
          >
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({...snackbar, open: false})}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ 
          borderRadius: 3,
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          fontSize: '1rem',
          fontWeight: 500
        }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
