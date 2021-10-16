import { GenericObject } from '../../../../common/types'
import { CreateIntentDTO } from '../../dto/create-intent.dto'

export enum TrainingPhraseType {
	EXAMPLE
}

export enum WebhookState {
	WEBHOOK_STATE_UNSPECIFIED,
	WEBHOOK_STATE_ENABLED,
	WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING
}

export enum IntentPlatform {
	PLATFORM_UNSPECIFIED,
	FACEBOOK,
	SLACK,
	TELEGRAM,
	KIK,
	SKYPE,
	LINE,
	VIBER,
	ACTIONS_ON_GOOGLE,
	GOOGLE_HANGOUTS
}

export enum IntentImageDisplayOptions {
	IMAGE_DISPLAY_OPTIONS_UNSPECIFIED,
	GRAY,
	WHITE,
	CROPPED,
	BLURRED_BACKGROUND
}

export enum IntentUrlTypeHint {
	URL_TYPE_HINT_UNSPECIFIED,
	AMP_ACTION,
	AMP_CONTENT
}

export enum IntentHorizontalAlignment {
	HORIZONTAL_ALIGNMENT_UNSPECIFIED,
	LEADING,
	CENTER,
	TRAILING
}

export enum IntentResponseMediaType {
	RESPONSE_MEDIA_TYPE_UNSPECIFIED,
	AUDIO
}

export type DialogflowCredentials = {
	type: string;
	project_id: string;
	private_key_id: string;
	private_key: string;
	client_email: string;
	client_id: string;
	client_x509_cert_url: string;
	api_key: string;
}

export type TrainingPhrasePart = {
	text: string;
	entityType?: string;
	alias?: string;
	userDefined?: boolean;
}

export type TrainingPhrase = {
	name?: string;
	type: TrainingPhraseType;
	parts: TrainingPhrasePart[];
	timesAddedCount?: number;
}

export type OutputContext = {
	name: string;
	lifespanCount?: number;
	parameters?: GenericObject;
}

export type IntentParameter = {
	name?: string;
	displayName: string;
	value?: string;
	defaultValue?: string;
	entityTypeDisplayName?: string;
	mandatory?: boolean;
	prompts?: string[];
	isList?: boolean;
}

export type IntentMessageText = {
	text: string[];
}

export type IntentImage = {
	imageUri: string;
	accessibilityText: string;
}

export type QuickReplies = {
	title: string;
	quickReplies: string[];
}

export type IntentButton = {
	text: string;
	postback: string;
}

export type IntentMessageCard = {
	title: string;
	subtitle: string;
	imageUri: string;
	buttons: IntentButton[];
}

export type IntentMessageSimpleResponse = {
	textToSpeech: string;
	ssml: string;
	displayText: string;
}

export type IntentMessageSimpleResponses = {
	simpleResponses: IntentMessageSimpleResponse[];
}

export type IntentBasicCard = {
	title: string;
	subtitle: string;
	formattedText: string;
	image: IntentImage;
	buttons: IntentButton[];
}

export type IntentSuggestion = {
	title: string;
}

export type IntentSuggestions = {
	suggestions: IntentSuggestion[];
}

export type LinkOutSuggestion = {
	destinationName: string;
	uri: string;
}

export type IntentSelectItemInfo = {
	key: string;
	synonyms: string[];
}

export type IntentItem = {
	info: IntentSelectItemInfo;
	title: string;
	description: string;
	image: IntentImage;
}

export type IntentListSelect = {
	title: string;
	items: IntentItem[];
	subtitle: string;
}

export type IntentCarouselSelect = {
	items: IntentItem[];
}

export type IntentOpenUrlAction = {
	url: string;
	urlTypeHint: IntentUrlTypeHint;
}

export type IntentBrowseCarouselCardItem = {
	openUriAction: IntentOpenUrlAction;
	title: string;
	description: string;
	image: IntentImage;
	footer: string;
}

export type IntentBrowseCarouselCard = {
	items: IntentBrowseCarouselCardItem[];
	imageDisplayOptions: IntentImageDisplayOptions;
}

export type IntentColumnProperty = {
	header: string;
	horizontalAlignment: IntentHorizontalAlignment;
}

export type IntentTableCardCell = {
	text: string;
}

export type IntentTableCardRow = {
	cells: IntentTableCardCell[];
	dividerAfter: boolean;
}

export type IntentTableCard = {
	title: string;
	subtitle: string;
	image: IntentImage;
	columnProperties: IntentColumnProperty[];
	rows: IntentTableCardRow[];
	buttons: IntentButton[];
}

export type IntentResponseMediaObject = {
	name: string;
	description: string;
	contentUrl: string;
	largeImage: IntentImage;
	icon: IntentImage;
}

export type IntentMediaContent = {
	mediaType: IntentResponseMediaType;
	mediaObjects: IntentResponseMediaObject[];
}

export type IntentMessage = {
	platform?: IntentPlatform;
	text?: IntentMessageText;
	image?: IntentImage;
	quickReplies?: QuickReplies;
	card?: IntentMessageCard;
	payload?: GenericObject;
	simpleResponses?: IntentMessageSimpleResponses;
	basicCard?: IntentBasicCard;
	suggestions?: IntentSuggestions;
	linkOutSuggestion?: LinkOutSuggestion;
	listSelect?: IntentListSelect;
	carouselSelect?: IntentCarouselSelect;
	browseCarouselCard?: IntentBrowseCarouselCard;
	tableCard?: IntentTableCard;
	mediaContent?: IntentMediaContent;
}

export type IntentFollowupIntentInfo = {
	followupIntentName: string;
	parentFollowupIntentName: string;
}

export class Intent {
	public name?: string;

	public displayName: string;

	public webhookState?: WebhookState;

	public priority?: number;

	public isFallback?: boolean;

	public mlDisabled?: boolean;

	public liveAgentHandoff?: boolean;

	public endInteraction?: boolean;

	public inputContextNames?: string[];

	public events?: string[];

	public trainingPhrases?: TrainingPhrase[];

	public action?: string;

	public outputContexts?: OutputContext;

	public resetContexts?: boolean;

	public parameters?: IntentParameter[];

	public messages?: IntentMessage[];

	public defaultResponsePlatforms?: IntentPlatform[];

	public rootFollowupIntentName?: string;

	public parentFollowupIntentName?: string;

	public followupIntentInfo?: IntentFollowupIntentInfo[];

	constructor(body: CreateIntentDTO) {

		const { name, training_phrases, priority, end_interaction } = body;

		this.displayName = name;
		this.priority = priority;
		this.endInteraction = end_interaction;
		this.trainingPhrases = training_phrases.map(trainingPhrase => {

			return {
				type: TrainingPhraseType.EXAMPLE,
				parts: [{
					text: trainingPhrase
				}]
			};
		});
	}
}
